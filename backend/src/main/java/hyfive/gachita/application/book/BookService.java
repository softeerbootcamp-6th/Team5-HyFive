package hyfive.gachita.application.book;

import hyfive.gachita.client.geocode.GeoCodeService;
import hyfive.gachita.client.geocode.dto.LatLng;
import hyfive.gachita.application.book.dto.BookCursor;
import hyfive.gachita.application.book.dto.BookRes;
import hyfive.gachita.application.book.dto.CreateBookReq;
import hyfive.gachita.application.common.dto.PagedListRes;
import hyfive.gachita.application.book.repository.BookRepository;
import hyfive.gachita.application.common.dto.ScrollRes;
import hyfive.gachita.application.common.enums.SearchPeriod;
import hyfive.gachita.global.BusinessException;
import hyfive.gachita.global.ErrorCode;
import hyfive.gachita.application.common.util.DateRangeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookService {
    private final BookRepository bookRepository;
    private final GeoCodeService geoCodeService;

    public Book createBook(CreateBookReq createBookReq) {
        if (bookRepository.existsBookByBookTelAndHospitalDate(createBookReq.bookTel(), createBookReq.hospitalDate())) {
            throw new BusinessException(ErrorCode.DUPLICATE_BOOK_DATE);
        }

        LatLng startLoc = geoCodeService.getPointByAddress(createBookReq.startAddr());
        LatLng endLoc = geoCodeService.getPointByAddress(createBookReq.endAddr());
        log.info("출발지 위도 {} 경도 {}", startLoc.lat(), startLoc.lng());
        log.info("도착지 위도 {} 경도 {}", endLoc.lat(), endLoc.lng());

        Book book = Book.builder()
                .bookName(createBookReq.bookName())
                .bookTel(createBookReq.bookTel())
                .hospitalDate(createBookReq.hospitalDate())
                .hospitalTime(createBookReq.hospitalTime())
                .startAddr(createBookReq.startAddr())
                .startLat(startLoc.lat())
                .startLng(startLoc.lng())
                .endAddr(createBookReq.endAddr())
                .endLat(endLoc.lat())
                .endLng(endLoc.lng())
                .walker(createBookReq.walker())
                .bookStatus(BookStatus.NEW)
                .deadline(createBookReq.hospitalTime().minusMinutes(30))
                .build();

        return bookRepository.save(book);
    }

    public PagedListRes<BookRes> getBookList(SearchPeriod period, BookStatus bookStatus, int page, int limit) {
        Pageable pageable = PageRequest.of(
                page - 1,
                limit
        );

        Pair<LocalDateTime, LocalDateTime> dateRange = DateRangeUtil.getDateRange(LocalDateTime.now(), period);
        Page<Book> pageResult = bookRepository.searchBookPageByCondition(dateRange, bookStatus, pageable);

        List<BookRes> bookResList = pageResult.getContent().stream().map(BookRes::from).toList();
        return PagedListRes.<BookRes>builder()
                .items(bookResList)
                .currentPageNum(pageResult.getNumber() + 1)
                .totalPageNum(pageResult.getTotalPages())
                .totalItemNum(pageResult.getTotalElements())
                .build();
    }

    public ScrollRes<BookRes, BookCursor> getBookListScroll(BookStatus bookStatus, BookCursor cursor, int size) {
        List<Book> bookList = bookRepository.findBooksForScroll(bookStatus, cursor, size);

        boolean hasNext = bookList.size() > size;

        List<Book> actualList = hasNext ? bookList.subList(0, size) : bookList;

        List<BookRes> bookResList = actualList.stream()
                .map(BookRes::from)
                .toList();

        BookCursor lastCursor = null;
        if (!actualList.isEmpty()) {
            Book lastBook = actualList.get(actualList.size() - 1);
            lastCursor = BookCursor.builder()
                    .lastId(lastBook.getId())
                    .lastCreatedAt(lastBook.getCreatedAt())
                    .build();
        }

        return ScrollRes.<BookRes, BookCursor>builder()
                .items(bookResList)
                .hasNext(hasNext)
                .cursor(lastCursor)
                .build();
    }
}

