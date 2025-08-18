package hyfive.gachita.dispatch.dto;

import java.time.LocalTime;

public record CarScheduleDto(
        Long centerId,
        double centerLat,
        double centerLng,
        Long carId,
        int carCapacity,
        Long rentalId,
        LocalTime rentalStartTime,
        LocalTime rentalEndTime
) {}
