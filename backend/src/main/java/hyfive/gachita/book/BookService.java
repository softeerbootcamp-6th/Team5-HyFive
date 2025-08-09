package hyfive.gachita.book;

import hyfive.gachita.api.geocode.GeoCodeService;
import hyfive.gachita.api.LatLng;
import hyfive.gachita.book.dto.BookRes;
import hyfive.gachita.book.dto.CreateBookReq;
import hyfive.gachita.common.dto.ListRes;
import hyfive.gachita.book.repository.BookRepository;
import hyfive.gachita.common.enums.SearchPeriod;
import hyfive.gachita.common.response.BusinessException;
import hyfive.gachita.common.response.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

        //TODO 출발지, 도착지의 위도, 경도 설정
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

    public ListRes<BookRes> getBookList(SearchPeriod period, BookStatus bookStatus, int page, int limit) {
        Pageable pageable = PageRequest.of(
                page - 1,
                limit,
                Sort.by("createdAt").descending()
        );

        Pair<LocalDateTime, LocalDateTime> dateRange = SearchPeriod.getDateRange(period);
        Page<Book> pageResult = bookRepository.searchBookPageByCondition(dateRange, bookStatus, pageable);

        List<BookRes> bookResList = pageResult.getContent().stream().map(BookRes::from).toList();
        return ListRes.<BookRes>builder()
                .items(bookResList)
                .currentPageNum(pageResult.getNumber() + 1)
                .totalPageNum(pageResult.getTotalPages())
                .totalItemNum(pageResult.getTotalElements())
                .build();
    }
}

