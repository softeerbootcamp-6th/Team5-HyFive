package hyfive.gachita.book.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public record CreateBookReq(

        @NotBlank(message = "예약자 이름은 필수입니다.")
        @Size(max = 50, message = "예약자 이름은 50자 이내여야 합니다.")
        String bookName,

        @NotBlank(message = "전화번호는 필수입니다.")
        String bookTel,

        @NotNull(message = "병원 날짜는 필수입니다.")
        LocalDate hospitalDate,

        @NotNull(message = "병원 시간은 필수입니다.")
        LocalTime hospitalTime,

        @NotBlank(message = "출발 주소는 필수입니다.")
        String startAddr,

        @NotBlank(message = "도착 주소는 필수입니다.")
        String endAddr,

        @NotNull(message = "보행기 여부는 필수입니다.")
        Boolean walker
) {}