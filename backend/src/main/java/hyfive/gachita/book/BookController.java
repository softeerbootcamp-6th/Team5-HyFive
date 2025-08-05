package hyfive.gachita.book;

import hyfive.gachita.book.dto.BookResponse;
import hyfive.gachita.book.dto.CreateBookDto;
import hyfive.gachita.common.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @PostMapping
    public BaseResponse<BookResponse> createBook(@RequestBody CreateBookDto createBookDto) {
        Book createdBook = bookService.createBook(createBookDto);
        return BaseResponse.success(BookResponse.from(createdBook));
    }
}
