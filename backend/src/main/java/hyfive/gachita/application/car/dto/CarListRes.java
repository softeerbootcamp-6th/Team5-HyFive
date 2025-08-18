package hyfive.gachita.application.car.dto;

import hyfive.gachita.application.car.Car;
import io.swagger.v3.oas.annotations.media.Schema;

import static hyfive.gachita.application.common.util.CarNumberFormatter.format;

public record CarListRes(
        @Schema(description = "차량 ID", example = "1")
        Long id,

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
        String carImage,

        @Schema(description = "차량 운행 상태", example = "false")
        Boolean driving
) {
    public static CarListRes from(Car car, Boolean driving) {
        return new CarListRes(
                car.getId(),
                car.getModelName(),
                format(car.getCarNumber()),
                car.getCapacity(),
                car.getLowFloor(),
                car.getCarImage(),
                driving
        );
    }
}

