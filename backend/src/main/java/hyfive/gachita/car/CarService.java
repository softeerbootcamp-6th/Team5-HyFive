package hyfive.gachita.car;

import hyfive.gachita.car.dto.CreateCarReq;
import hyfive.gachita.car.dto.UpdateCarReq;
import hyfive.gachita.center.Center;
import hyfive.gachita.center.CenterRepository;
import hyfive.gachita.common.response.BusinessException;
import hyfive.gachita.common.response.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static hyfive.gachita.common.util.CarNumberFormatter.normalize;

@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepository carRepository;
    private final CenterRepository centerRepository;

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

        // TODO : 이미지 저장 service 개발 필요
        String imageUrl = "test";

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

        // TODO : 이미지 저장 service 개발 필요 - 기존 사진 덮어 쓰기
        String imageUrl = "test_change";

        car.update(
                updateCarReq.modelName(),
                normalizedCarNumber,
                updateCarReq.capacity(),
                updateCarReq.lowFloor(),
                imageUrl
        );

        return car;
    }
}
