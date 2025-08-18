package hyfive.gachita.dispatch.dto;

import java.util.List;

public record FinalPathCandidateDto(
        Long pathId,
        Long carId,
        List<NodeDispatchLocationDto> newNodes,
        List<NodeDispatchLocationDto> pathNodes,
        int totalDuration,
        int totalDistance
) {
}
