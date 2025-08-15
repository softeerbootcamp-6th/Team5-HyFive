package hyfive.gachita.application.book;

import hyfive.gachita.application.book.dto.BookCursor;
import hyfive.gachita.application.book.dto.BookRes;
import hyfive.gachita.application.book.dto.CreateBookReq;
import hyfive.gachita.application.common.dto.PagedListRes;
import hyfive.gachita.application.common.dto.ScrollRes;
import hyfive.gachita.application.common.enums.SearchPeriod;
import hyfive.gachita.global.BaseResponse;
import hyfive.gachita.docs.BookDocs;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
@Validated
public class BookController implements BookDocs {
    private final BookService bookService;

    @PostMapping
    public BaseResponse<BookRes> createBook(@RequestBody CreateBookReq createBookReq) {
        Book createdBook = bookService.createBook(createBookReq);
        return BaseResponse.success(BookRes.from(createdBook));
    }

    @GetMapping("/list")
    public BaseResponse<PagedListRes<BookRes>> getBookList(
            @RequestParam(name = "period", required = false, defaultValue = "TODAY") SearchPeriod period,
            @RequestParam(name = "status") BookStatus bookStatus,
            @RequestParam(name = "page", required = false, defaultValue = "1") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "12") int limit
    ) {
        return BaseResponse.success(bookService.getBookList(period, bookStatus, page, limit));
    }

    @GetMapping("/scroll")
    public BaseResponse<ScrollRes<BookRes, BookCursor>> getBookListScroll(
            @RequestParam(name = "status", defaultValue = "NEW") BookStatus bookStatus,
            @ModelAttribute BookCursor cursor,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        return BaseResponse.success(bookService.getBookListScroll(bookStatus, cursor, size));
    }
}
