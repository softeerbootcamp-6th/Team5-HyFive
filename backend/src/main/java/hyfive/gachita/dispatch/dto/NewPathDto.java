package hyfive.gachita.dispatch.dto;

import java.time.LocalTime;

public record NewPathDto(
        Long centerId,
        Long centerLat, // 제거?
        Long centerLng, // 제거?
        Long carId,
        Long carCapacity,
        Long rentalId,
        LocalTime rentalStartTime,
        LocalTime rentalEndTime
) {}
