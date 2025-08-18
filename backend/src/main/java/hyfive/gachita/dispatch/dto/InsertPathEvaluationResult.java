package hyfive.gachita.dispatch.dto;

import java.util.List;

public record InsertPathEvaluationResult(
        Long pathId,
        Long carId,
        List<NewNodeDispatchLocationDto> newNodes,
        List<NodeDispatchLocationDto> pathNodes,
        int totalDuration,
        int totalDistance
) {
}
