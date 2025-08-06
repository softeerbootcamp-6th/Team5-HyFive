package hyfive.gachita.car.dto;

import hyfive.gachita.car.Car;

public record CarRes(
         Long id,
         Long centerId,
         String centerName,
         String modelName,
         String carNumber,
         int capacity,
         Boolean lowFloor,
         String carImage
) {
    public static CarRes from(Car car) {
        return new CarRes(
                car.getId(),
                car.getCenter().getId(),
                car.getCenter().getCenterName(),
                car.getModelName(),
                car.getCarNumber(),
                car.getCapacity(),
                car.getLowFloor(),
                car.getCarImage()
        );
    }
}
