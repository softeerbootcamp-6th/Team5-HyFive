package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.car.Car;
import hyfive.gachita.application.rental.AvailableRental;

public record CarScheduleDto(
        FilteredCenterDto centerDto,
        Car car,
        AvailableRental availableRental
) {}
