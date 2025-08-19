package hyfive.gachita.dispatch.dto;

import lombok.Builder;

import java.time.LocalTime;
import java.util.List;

@Builder
public record FinalNewPathDto(
        FilteredCenterDto centerDto,
        Long carId,
        int carCapacity,
        Long rentalId,
        LocalTime rentalStartTime,
        LocalTime rentalEndTime,
        int totalDuration,
        int totalDistance,
        List<NewPathNodeDto> nodeList
) {
    public static FinalNewPathDto from(CarScheduleDto path, int totalDuration, int totalDistance, List<NewPathNodeDto> nodeList) {
        return new FinalNewPathDto(
                path.centerDto(),
                path.carId(),
                path.carCapacity(),
                path.rentalId(),
                path.rentalStartTime(),
                path.rentalEndTime(),
                totalDuration,
                totalDistance,
                nodeList
        );
    }
}