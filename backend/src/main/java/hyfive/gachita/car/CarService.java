package hyfive.gachita.car;

import hyfive.gachita.car.dto.CreateCarReq;
import hyfive.gachita.center.Center;
import hyfive.gachita.center.CenterRepository;
import hyfive.gachita.common.response.BusinessException;
import hyfive.gachita.common.response.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

        String normalizedCarNumber = normalizeCarNumber(createCarReq.carNumber());
        if (carRepository.existsByCarNumberAndDelYn(normalizedCarNumber, DelYn.N)) {
            throw new BusinessException(ErrorCode.DUPLICATE_CAR_NUMBER);
        }

        // TODO : 이미지 저장 service 개발 필요
        String imgUrl = "test";

        // 엔티티 생성
        Car car = Car.builder()
                .center(center)
                .modelName(createCarReq.modelName())
                .carNumber(normalizedCarNumber)
                .capacity(createCarReq.capacity())
                .lowFloor(createCarReq.lowFloor())
                .carImage(imgUrl)
                .build();

        return carRepository.save(car);
    }

    private String normalizeCarNumber(String carNumber) {
        // 예: " 12 가 1 234" -> "12가1234"
        return carNumber.replaceAll("[\\s-]", "");
    }

    private String formatCarNumber(String carNumber) {
        // 예: "12가1234" → "12가 1234"
        return carNumber.replaceFirst("^(\\d{2,3}[가-힣])(\\d{4})$", "$1 $2");
    }
}
