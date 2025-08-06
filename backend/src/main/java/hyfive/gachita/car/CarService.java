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

        // TODO : 이미지 저장 service 개발 필요
        String imgUrl = "test";

        // 엔티티 생성
        Car car = Car.builder()
                .center(center)
                .modelName(createCarReq.modelName())
                .carNumber(createCarReq.carNumber())
                .capacity(createCarReq.capacity())
                .lowFloor(createCarReq.lowFloor())
                .carImage(imgUrl)
                .build();

        return carRepository.save(car);
    }
}
