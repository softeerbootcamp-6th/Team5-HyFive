package hyfive.gachita.book.dto;

import hyfive.gachita.book.BookStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class BookResponse {
    private Long id;
    private String bookName;
    private String bookTel;
    private LocalDate bookDate;
    private LocalTime bookTime;
    private LocalDate hospitalDate;
    private LocalTime hospitalTime;
    private String startAddr;
    private String endAddr;
    private Boolean walker;
    private BookStatus bookStatus;
}
