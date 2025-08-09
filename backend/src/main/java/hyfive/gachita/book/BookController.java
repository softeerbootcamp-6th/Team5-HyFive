package hyfive.gachita.book;

import hyfive.gachita.book.dto.BookCursor;
import hyfive.gachita.book.dto.BookRes;
import hyfive.gachita.book.dto.CreateBookReq;
import hyfive.gachita.common.dto.ListRes;
import hyfive.gachita.common.dto.ScrollRes;
import hyfive.gachita.common.enums.SearchPeriod;
import hyfive.gachita.common.response.BaseResponse;
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
    public BaseResponse<BookRes> createBook(@RequestBody
                                                CreateBookReq createBookReq) {
        Book createdBook = bookService.createBook(createBookReq);
        return BaseResponse.success(BookRes.from(createdBook));
    }

    @GetMapping("/list")
    public BaseResponse<ListRes<BookRes>> getBookList(
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
