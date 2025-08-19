package hyfive.gachita.dispatch.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record FinalPathCandidateDto(
        Long pathId,
        Long carId,
        List<NodeDto> newNodes,
        List<NodeDto> oldNodes,
        int totalDuration,
        int totalDistance
) {
}
