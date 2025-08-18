package hyfive.gachita.application.car.dto;

import hyfive.gachita.application.car.Car;
import io.swagger.v3.oas.annotations.media.Schema;

import static hyfive.gachita.application.common.util.CarNumberFormatter.format;

public record CarRes(
        @Schema(description = "차량 ID", example = "1")
        Long id,

        @Schema(description = "차량이 소속된 센터 ID", example = "1")
        Long centerId,

        @Schema(description = "센터명", example = "공릉노인복지관")
        String centerName,

        @Schema(description = "차량 모델명", example = "기아 레이")
        String modelName,

        @Schema(description = "차량 번호", example = "12가 3456")
        String carNumber,

        @Schema(description = "탑승 가능 인원 수", example = "3")
        int capacity,

        @Schema(description = "저상 차량 여부", example = "false")
        Boolean lowFloor,

        // TODO : carImage example 추가
        @Schema(description = "차량 이미지 url", example = "(차후 추가 예정)")
        String carImage
    ) {
    public static CarRes from(Car car) {
        return new CarRes(
                car.getId(),
                car.getCenter().getId(),
                car.getCenter().getCenterName(),
                car.getModelName(),
                format(car.getCarNumber()),
                car.getCapacity(),
                car.getLowFloor(),
                car.getCarImage()
        );
    }
}
