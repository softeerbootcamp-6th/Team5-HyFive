package hyfive.gachita.book;

import hyfive.gachita.docs.BookDocs;
import hyfive.gachita.book.dto.BookRes;
import hyfive.gachita.book.dto.CreateBookReq;
import hyfive.gachita.common.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController implements BookDocs {
    private final BookService bookService;

    @PostMapping
    public BaseResponse<BookRes> createBook(@RequestBody @Validated CreateBookReq createBookReq) {
        Book createdBook = bookService.createBook(createBookReq);
        return BaseResponse.success(BookRes.from(createdBook));
    }
}
