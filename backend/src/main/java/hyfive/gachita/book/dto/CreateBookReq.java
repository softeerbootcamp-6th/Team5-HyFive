package hyfive.gachita.book.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

@Schema(description = "예약 생성 요청 DTO")
public record CreateBookReq(

        @Schema(description = "예약자 이름", example = "홍길동")
        @NotBlank(message = "예약자 이름은 필수입니다.")
        @Size(max = 50, message = "예약자 이름은 50자 이내여야 합니다.")
        String bookName,

        @Schema(description = "예약자 전화번호", example = "010-1234-5678")
        @NotBlank(message = "전화번호는 필수입니다.")
        String bookTel,

        @Schema(description = "병원 예약 날짜 (yyyy-MM-dd)", example = "2025-08-10")
        @NotNull(message = "병원 날짜는 필수입니다.")
        LocalDate hospitalDate,

        @Schema(description = "병원 예약 시간 (HH:mm)", example = "10:30")
        @NotNull(message = "병원 시간은 필수입니다.")
        LocalTime hospitalTime,

        @Schema(description = "출발지 주소", example = "서울특별시 노원구 동일로 123")
        @NotBlank(message = "출발 주소는 필수입니다.")
        String startAddr,

        @Schema(description = "도착지 주소", example = "서울특별시 노원구 노해로 45")
        @NotBlank(message = "도착 주소는 필수입니다.")
        String endAddr,

        @Schema(description = "보행기 사용 여부", example = "true")
        @NotNull(message = "보행기 여부는 필수입니다.")
        Boolean walker
) {}