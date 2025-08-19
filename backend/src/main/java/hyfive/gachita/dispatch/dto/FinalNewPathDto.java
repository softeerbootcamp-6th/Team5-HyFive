package hyfive.gachita.dispatch.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record FinalNewPathDto(
        CarScheduleDto path,
        int totalDuration,
        int totalDistance,
        List<NewPathNodeDto> nodeList
) {}
