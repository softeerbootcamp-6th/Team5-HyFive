package hyfive.gachita.domain.book.repository;

import hyfive.gachita.domain.book.Book;
import hyfive.gachita.domain.book.BookStatus;
import hyfive.gachita.domain.book.dto.BookCursor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;

import java.time.LocalDateTime;
import java.util.List;

public interface CustomBookRepository {
    Page<Book> searchBookPageByCondition(Pair<LocalDateTime, LocalDateTime> dateRange,
                                         BookStatus status,
                                         Pageable pageable);
    List<Book> findBooksForScroll(BookStatus status, BookCursor cursorId, int size);
}
