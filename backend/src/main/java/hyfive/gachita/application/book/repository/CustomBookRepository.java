package hyfive.gachita.application.book.repository;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.book.BookStatus;
import hyfive.gachita.application.book.dto.BookCursor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface CustomBookRepository {
    Page<Book> searchBookPageByCondition(Pair<LocalDateTime, LocalDateTime> dateRange,
                                         BookStatus status,
                                         Pageable pageable);
    List<Book> findBooksForScroll(BookStatus status, BookCursor cursorId, int size);
    List<Book> findBooksForScrollWithPath(BookStatus status, BookCursor cursor, int size);
    List<Book> searchCandidates(LocalDate hospitalTime);
}
