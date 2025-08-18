package hyfive.gachita.dispatch.dto;

import java.util.List;

public record FinalPathCandidateDto(
        Long pathId,
        Long carId,
        List<NodeDto> newNodes,
        List<NodeDto> pathNodes,
        int totalDuration,
        int totalDistance
) {
}
