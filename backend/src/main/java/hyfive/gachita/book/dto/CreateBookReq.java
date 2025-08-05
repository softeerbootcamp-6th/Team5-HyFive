package hyfive.gachita.book.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
public class CreateBookReq {
    @NotBlank(message = "예약자 이름은 필수입니다.")
    @Size(max = 50, message = "예약자 이름은 50자 이내여야 합니다.")
    private String bookName;

    @NotBlank(message = "전화번호는 필수입니다.")
    private String bookTel;

    @NotNull(message = "병원 날짜는 필수입니다.")
    private LocalDate hospitalDate;

    @NotNull(message = "병원 시간은 필수입니다.")
    private LocalTime hospitalTime;

    @NotBlank(message = "출발 주소는 필수입니다.")
    private String startAddr;

    @NotBlank(message = "도착 주소는 필수입니다.")
    private String endAddr;

    @NotNull(message = "보행기 여부는 필수입니다.")
    private Boolean walker;
}