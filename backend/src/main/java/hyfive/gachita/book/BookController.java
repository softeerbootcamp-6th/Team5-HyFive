package hyfive.gachita.book;

import hyfive.gachita.book.dto.BookRes;
import hyfive.gachita.book.dto.CreateBookReq;
import hyfive.gachita.book.dto.ListRes;
import hyfive.gachita.common.response.BaseResponse;
import hyfive.gachita.docs.BookDocs;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
@Slf4j
@Validated
public class BookController implements BookDocs {
    private final BookService bookService;

    @PostMapping
    public BaseResponse<BookRes> createBook(@RequestBody
                                                CreateBookReq createBookReq) {
        Book createdBook = bookService.createBook(createBookReq);
        return BaseResponse.success(BookRes.from(createdBook));
    }

    // TODO : enum 소문자 인식
    @GetMapping("/list")
    public BaseResponse<ListRes<BookRes>> getBookList(
            @RequestParam(name = "period", defaultValue = "TODAY") SearchPeriod period,
            @RequestParam(name = "status", required = false) BookStatus bookStatus,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "limit", defaultValue = "12") int limit
    ) {
//        List<Book> bookList = bookService.getBookList(period, bookStatus, page, limit);
        return BaseResponse.success(bookService.getBookList(period, bookStatus, page, limit));
    }
}
