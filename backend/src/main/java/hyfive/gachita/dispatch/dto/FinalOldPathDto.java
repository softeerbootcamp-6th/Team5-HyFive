package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.path.Path;
import hyfive.gachita.application.path.PathService;
import lombok.Builder;

import java.util.List;

@Builder
public record FinalOldPathDto(
        Long pathId,
        Long carId,
        List<NodeDto> nodeList,
        int totalDuration,
        int totalDistance
) implements DispatchResult {

    @Override
    public Path apply(PathService pathService, Book newBook) {
        return pathService.updatePathWithNodes(this, newBook);
    }
}
