package hyfive.gachita.book;

import hyfive.gachita.book.dto.CreateBookDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    public Book createBook(CreateBookDto createBookDto) {
        //TODO 출발지, 도착지의 위도, 경도 설정
        Book book = Book.builder()
                .bookName(createBookDto.getBookName())
                .bookTel(createBookDto.getBookTel())
                .hospitalDate(createBookDto.getHospitalDate())
                .hospitalTime(createBookDto.getHospitalTime())
                .startAddr(createBookDto.getStartAddr())
                .endAddr(createBookDto.getEndAddr())
                .walker(createBookDto.getWalker())
                .bookStatus(BookStatus.NEW)
                .deadline(createBookDto.getHospitalTime().minusMinutes(30))
                .build();

        bookRepository.save(book);
        return book;
    }
}

