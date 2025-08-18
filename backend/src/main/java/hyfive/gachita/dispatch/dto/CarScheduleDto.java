package hyfive.gachita.dispatch.dto;

import java.time.LocalTime;

public record CarScheduleDto(
        CenterDto centerDto,
        Long carId,
        int carCapacity,
        Long rentalId,
        LocalTime rentalStartTime,
        LocalTime rentalEndTime
) {}
