package hyfive.gachita.dispatch.dto;

import java.time.LocalTime;

public record IdleCarDto(
        Long centerId,
        Long centerLat,
        Long centerLng,
        Long carId,
        Long carCapacity,
        LocalTime rentalStartTime,
        LocalTime rentalEndTime
) {}
