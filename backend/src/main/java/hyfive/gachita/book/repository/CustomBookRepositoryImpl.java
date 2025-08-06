package hyfive.gachita.book.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.book.Book;
import hyfive.gachita.book.BookStatus;
import hyfive.gachita.book.QBook;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;

import java.time.LocalDateTime;
import java.util.List;
import static hyfive.gachita.book.QBook.book;

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