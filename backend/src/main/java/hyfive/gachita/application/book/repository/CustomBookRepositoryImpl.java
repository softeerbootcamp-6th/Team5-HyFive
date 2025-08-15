package hyfive.gachita.application.book.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.book.BookStatus;

import hyfive.gachita.application.book.QBook;
import hyfive.gachita.application.book.dto.BookCursor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import static hyfive.gachita.application.book.QBook.book;


@RequiredArgsConstructor
public class CustomBookRepositoryImpl implements CustomBookRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Book> searchBookPageByCondition(Pair<LocalDateTime, LocalDateTime> dateRange,
                                                BookStatus status,
                                                Pageable pageable) {

        List<Book> books = queryFactory
                .selectFrom(book)
                .where(
                        betweenCreatedDate(book, dateRange),
                        statusEq(book, status)
                )
                .orderBy(book.createdAt.desc(), book.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = queryFactory
                .select(Wildcard.count)
                .from(book)
                .where(
                        betweenCreatedDate(book, dateRange),
                        statusEq(book, status)
                )
                .fetchOne();

        return new PageImpl<>(books, pageable, total == null ? 0L : total);
    }

    @Override
    public List<Book> findBooksForScroll(BookStatus status, BookCursor cursor, int size) {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfToday = today.atStartOfDay();
        LocalDateTime endOfToday = today.atTime(LocalTime.MAX);

        BooleanExpression cursorCondition = null;

        if (cursor != null && cursor.lastCreatedAt() != null && cursor.lastId() != null) {
            cursorCondition = book.createdAt.lt(cursor.lastCreatedAt())
                    .or(
                            book.createdAt.eq(cursor.lastCreatedAt())
                                    .and(book.id.lt(cursor.lastId()))
                    );
        }

        return queryFactory
                .selectFrom(book)
                .where(
                        book.bookStatus.eq(status),
                        book.createdAt.between(startOfToday, endOfToday),
                        cursorCondition
                )
                .orderBy(book.createdAt.desc(), book.id.desc())
                .limit(size + 1)
                .fetch();
    }

    private BooleanExpression betweenCreatedDate(QBook book, Pair<LocalDateTime, LocalDateTime> dateRange) {
        if (dateRange == null) {
            return null;
        }
        return book.createdAt.between(dateRange.getFirst(), dateRange.getSecond());
    }

    private BooleanExpression statusEq(QBook book, BookStatus status) {
        return status != null ? book.bookStatus.eq(status) : null;
    }
}