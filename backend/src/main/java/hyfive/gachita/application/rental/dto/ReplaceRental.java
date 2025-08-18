package hyfive.gachita.application.rental.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

@Schema(description = "유휴 시간 생성 요청 DTO")
public record ReplaceRental(
        @Schema(description = "유휴 날짜 (yyyy-MM-dd)", example = "2025-08-20")
        @NotNull(message = "유휴 날짜는 필수입니다.")
        LocalDate rentalDate,

        @Schema(description = "유휴 시작 시간 (HH:mm)", example = "10:00")
        @NotNull(message = "유휴 시작 시간은 필수입니다.")
        LocalTime rentalStartTime,

        @Schema(description = "유휴 종료 시간 (HH:mm)", example = "14:00")
        @NotNull(message = "유휴 종료 시간은 필수입니다.")
        LocalTime rentalEndTime
) {}
