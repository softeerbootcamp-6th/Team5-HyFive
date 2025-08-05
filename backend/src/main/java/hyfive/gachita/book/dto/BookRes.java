package hyfive.gachita.book.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import hyfive.gachita.book.Book;
import hyfive.gachita.book.BookStatus;

import java.time.LocalDate;
import java.time.LocalTime;

public record BookRes(
        Long id,
        String bookName,
        String bookTel,
        LocalDate bookDate,

        @JsonFormat(pattern = "HH:mm")
        @JsonProperty("bookTime")
        LocalTime bookTime,

        LocalDate hospitalDate,

        @JsonFormat(pattern = "HH:mm")
        @JsonProperty("hospitalTime")
        LocalTime hospitalTime,

        String startAddr,
        String endAddr,
        Boolean walker,
        BookStatus bookStatus
) {
    public static BookRes from(Book book) {
        return new BookRes(
                book.getId(),
                book.getBookName(),
                book.getBookTel(),
                book.getCreatedAt().toLocalDate(),
                book.getCreatedAt().toLocalTime(),
                book.getHospitalDate(),
                book.getHospitalTime(),
                book.getStartAddr(),
                book.getEndAddr(),
                book.getWalker(),
                book.getBookStatus()
        );
    }
}