package hyfive.gachita.application.book.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.book.BookStatus;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalTime;

@Schema(description = "예약 응답 DTO")
public record BookRes(

        @Schema(description = "예약 ID", example = "1")
        Long id,

        @Schema(description = "예약자 이름", example = "홍길동")
        String bookName,

        @Schema(description = "예약자 전화번호", example = "010-1234-5678")
        String bookTel,

        @Schema(description = "예약 생성 날짜 (yyyy.MM.dd)", example = "2025.08.06")
        @JsonFormat(pattern = "yyyy.MM.dd")
        LocalDate bookDate,

        @Schema(description = "예약 생성 시간 (HH:mm)", example = "09:15")
        @JsonFormat(pattern = "HH:mm")
        @JsonProperty("bookTime")
        LocalTime bookTime,

        @Schema(description = "병원 예약 날짜 (yyyy.MM.dd)", example = "2025.08.10")
        @JsonFormat(pattern = "yyyy.MM.dd")
        LocalDate hospitalDate,

        @Schema(description = "병원 예약 시간 (HH:mm)", example = "10:30")
        @JsonFormat(pattern = "HH:mm")
        @JsonProperty("hospitalTime")
        LocalTime hospitalTime,

        @Schema(description = "출발지 주소", example = "서울특별시 노원구 동일로 123")
        String startAddr,

        @Schema(description = "도착지 주소", example = "서울특별시 노원구 노해로 45")
        String endAddr,

        @Schema(description = "보행기 사용 여부", example = "true")
        Boolean walker,

        @Schema(description = "예약 상태", example = "NEW")
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