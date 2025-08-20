package hyfive.gachita.dispatch.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record FinalOldPathDto(
        Long pathId,
        Long carId,
        List<NodeDto> newNodes,
        List<NodeDto> oldNodes,
        int totalDuration,
        int totalDistance
) {
// TODO: 데이터베이스 업데이트 로직 구현 필요
//implements DispatchResult {
//    @Override
//    public Path apply(PathService pathService, Book newBook) {
//        return pathService.updatePathWithNodes(this, newBook);
//    }
}
