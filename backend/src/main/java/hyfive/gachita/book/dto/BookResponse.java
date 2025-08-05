package hyfive.gachita.book.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import hyfive.gachita.book.Book;
import hyfive.gachita.book.BookStatus;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
public class BookResponse {
    private Long id;
    private String bookName;
    private String bookTel;
    private LocalDate bookDate;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime bookTime;

    private LocalDate hospitalDate;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime hospitalTime;

    private String startAddr;
    private String endAddr;
    private Boolean walker;
    private BookStatus bookStatus;

    public static BookResponse from(Book book) {
        BookResponse dto = new BookResponse();
        dto.id = book.getId();
        dto.bookName = book.getBookName();
        dto.bookTel = book.getBookTel();
        dto.bookDate = book.getCreatedAt().toLocalDate();
        dto.bookTime = book.getCreatedAt().toLocalTime();
        dto.hospitalDate = book.getHospitalDate();
        dto.hospitalTime = book.getHospitalTime();
        dto.startAddr = book.getStartAddr();
        dto.endAddr = book.getEndAddr();
        dto.walker = book.getWalker();
        dto.bookStatus = book.getBookStatus();
        return dto;
    }
}
