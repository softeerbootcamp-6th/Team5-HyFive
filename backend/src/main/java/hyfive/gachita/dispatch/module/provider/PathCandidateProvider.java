package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.application.book.repository.BookRepository;
import hyfive.gachita.dispatch.dto.DispatchLocation;
import hyfive.gachita.dispatch.dto.PathCandidateDto;
import hyfive.gachita.dispatch.module.condition.Condition;
import hyfive.gachita.dispatch.module.condition.PathCandidateCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class PathCandidateProvider implements DispatchLocationProvider {
    private final BookRepository bookRepository;

    @Override
    public List<DispatchLocation> getByCondition(Condition pathCandidateCondition) {
        return bookRepository.searchCandidates((PathCandidateCondition) pathCandidateCondition).stream()
                .<DispatchLocation>flatMap(book -> Stream.of(
                        PathCandidateDto.fromStart(book),
                        PathCandidateDto.fromEnd(book)
                ))
                .toList();
    }
}
