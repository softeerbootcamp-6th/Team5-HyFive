package hyfive.gachita.book;

import hyfive.gachita.book.dto.CreateBookReq;
import hyfive.gachita.common.response.BusinessException;
import hyfive.gachita.common.response.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    public Book createBook(CreateBookReq createBookReq) {
        if (bookRepository.existsBookByBookTelAndHospitalDate(createBookReq.getBookTel(), createBookReq.getHospitalDate())) {
            throw new BusinessException(ErrorCode.DUPLICATE_BOOK_DATE);
        }

        //TODO 출발지, 도착지의 위도, 경도 설정
        Book book = Book.builder()
                .bookName(createBookReq.getBookName())
                .bookTel(createBookReq.getBookTel())
                .hospitalDate(createBookReq.getHospitalDate())
                .hospitalTime(createBookReq.getHospitalTime())
                .startAddr(createBookReq.getStartAddr())
                .endAddr(createBookReq.getEndAddr())
                .walker(createBookReq.getWalker())
                .bookStatus(BookStatus.NEW)
                .deadline(createBookReq.getHospitalTime().minusMinutes(30))
                .build();

        bookRepository.save(book);
        return book;
    }
}

