package hyfive.gachita.dispatch.dto;

import java.time.LocalTime;

public record CarScheduleDto(
        FilteredCenterDto centerDto,
        Long carId,
        int carCapacity,
        Long rentalId,
        LocalTime rentalStartTime,
        LocalTime rentalEndTime
) {}
