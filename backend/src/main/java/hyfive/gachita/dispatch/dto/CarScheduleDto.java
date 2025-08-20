package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.car.Car;
import hyfive.gachita.application.rental.Rental;

public record CarScheduleDto(
        FilteredCenterDto centerDto,
        Car car,
        Rental rental
) {}
