package hyfive.gachita.book.dto;

import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

// TODO: 유효성 검사 추가하기
@Getter
public class CreateBookDto {
    private String bookName;
    private String bookTel;
    private LocalDate hospitalDate;
    private LocalTime hospitalTime;
    private String startAddr;
    private String endAddr;
    private Boolean walker;
}
