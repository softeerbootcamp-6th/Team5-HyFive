package hyfive.gachita.book.repository;

import hyfive.gachita.book.Book;
import hyfive.gachita.book.BookStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;

import java.time.LocalDateTime;
import java.util.List;

public interface CustomBookRepository {
    Page<Book> searchBookPageByCondition(Pair<LocalDateTime, LocalDateTime> dateRange,
                                         BookStatus status,
                                         Pageable pageable);
    List<Book> findBooksForScroll(BookStatus status, Long cursorId, int size);
}
