package hyfive.gachita.dispatch.dto;

public record IdleTimeDto(
        Long centerId,
        Long centerLat,
        Long centerLng,
        Long carId,
        Long carCapacity,
        Long rentalStartTime,
        Long rentalEndTime
) {
}
