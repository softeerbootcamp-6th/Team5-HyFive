package hyfive.gachita.book;

import hyfive.gachita.book.dto.CreateBookReq;
import hyfive.gachita.common.response.BusinessException;
import hyfive.gachita.common.response.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookService {
    private final BookRepository bookRepository;

    public Book createBook(CreateBookReq createBookReq) {
        if (bookRepository.existsBookByBookTelAndHospitalDate(createBookReq.bookTel(), createBookReq.hospitalDate())) {
            throw new BusinessException(ErrorCode.DUPLICATE_BOOK_DATE);
        }

        //TODO 출발지, 도착지의 위도, 경도 설정
        Book book = Book.builder()
                .bookName(createBookReq.bookName())
                .bookTel(createBookReq.bookTel())
                .hospitalDate(createBookReq.hospitalDate())
                .hospitalTime(createBookReq.hospitalTime())
                .startAddr(createBookReq.startAddr())
                .endAddr(createBookReq.endAddr())
                .walker(createBookReq.walker())
                .bookStatus(BookStatus.NEW)
                .deadline(createBookReq.hospitalTime().minusMinutes(30))
                .build();

        return bookRepository.save(book);
    }

    // TODO: 예약 시간 기준 필터링 조건 추가하기
    public List<Book> getBookList(SearchPeriod period, BookStatus bookStatus, Integer page, Integer limit) {
        log.info("all : {}", bookRepository.findAll().size());

        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        if (bookStatus == null){
            return bookRepository.findAll(pageable).getContent();
        }
        return bookRepository.findAllByBookStatus(bookStatus, pageable).getContent();
    }
}

