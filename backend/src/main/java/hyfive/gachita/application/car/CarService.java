package hyfive.gachita.application.car;

import hyfive.gachita.application.car.dto.CarListRes;
import hyfive.gachita.application.car.dto.CreateCarReq;
import hyfive.gachita.application.car.dto.UpdateCarReq;
import hyfive.gachita.application.car.repository.CarRepository;
import hyfive.gachita.application.center.Center;
import hyfive.gachita.application.center.repository.CenterRepository;
import hyfive.gachita.global.BusinessException;
import hyfive.gachita.global.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static hyfive.gachita.application.common.util.CarNumberFormatter.normalize;

@Slf4j
@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepository carRepository;
    private final CenterRepository centerRepository;
    private final S3Service s3Service;

    public Car createCar(CreateCarReq createCarReq){
        Center center = centerRepository.findById(createCarReq.centerId())
                .orElseThrow(() -> new BusinessException(ErrorCode.NO_EXIST_VALUE, "DB에 센터 데이터가 존재하지 않습니다."));

        long carCount = carRepository.countByCenterAndDelYn(center, DelYn.N);
        if (carCount >= 6) {
            throw new BusinessException(ErrorCode.MAX_CAR_COUNT_EXCEEDED);
        }

        String normalizedCarNumber = normalize(createCarReq.carNumber());
        if (carRepository.existsByCarNumberAndDelYn(normalizedCarNumber, DelYn.N)) {
            throw new BusinessException(ErrorCode.DUPLICATE_CAR_NUMBER);
        }

        String imageUrl = s3Service.uploadImage(createCarReq.imageFile());

        // 엔티티 생성
        Car car = Car.builder()
                .center(center)
                .modelName(createCarReq.modelName())
                .carNumber(normalizedCarNumber)
                .capacity(createCarReq.capacity())
                .lowFloor(createCarReq.lowFloor())
                .carImage(imageUrl)
                .build();

        return carRepository.save(car);
    }

    @Transactional
    public Car updateCar(Long id, UpdateCarReq updateCarReq) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NO_EXIST_VALUE, "DB에 차량 데이터가 존재하지 않습니다."));

        String normalizedCarNumber = normalize(updateCarReq.carNumber());
        if (carRepository.existsByIdNotAndCarNumberAndDelYn(id, normalizedCarNumber, DelYn.N)) {
            throw new BusinessException(ErrorCode.DUPLICATE_CAR_NUMBER);
        }

        String imageUrl = car.getCarImage();
        if (!(updateCarReq.imageFile() == null)) {
            imageUrl = s3Service.uploadImage(updateCarReq.imageFile());
        }

        car.update(
                updateCarReq.modelName(),
                normalizedCarNumber,
                updateCarReq.capacity(),
                updateCarReq.lowFloor(),
                imageUrl
        );

        return car;
    }

    public Car getCar(Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NO_EXIST_VALUE, "DB에 차량 데이터가 존재하지 않습니다."));
        return car;
    }

    @Transactional
    public List<CarListRes> getCarList(Long centerId) {
        centerRepository.findById(centerId)
                .orElseThrow(() -> new BusinessException(ErrorCode.NO_EXIST_VALUE, "DB에 센터 데이터가 존재하지 않습니다."));

        return carRepository.searchCarListByCondition(centerId);
    }

    @Transactional
    public Car deleteCar(Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NO_EXIST_VALUE, "DB에 차량 데이터가 존재하지 않습니다."));

        car.delete();

        return car;
    }
}
