package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.application.book.repository.BookRepository;
import hyfive.gachita.dispatch.dto.PathCandidateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class PathCandidateProvider{
    private final BookRepository bookRepository;

    public List<PathCandidateDto> getByCondition(LocalDate hospitalTime) {
        return bookRepository.searchCandidates(hospitalTime).stream()
                .flatMap(book -> Stream.of(
                        PathCandidateDto.fromStart(book),
                        PathCandidateDto.fromEnd(book)
                ))
                .toList();
    }
}