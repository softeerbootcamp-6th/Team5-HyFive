package hyfive.gachita.application.rental.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import hyfive.gachita.application.rental.Rental;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalTime;

@Schema(description = "유휴 시간 응답 DTO")
public record RentalRes(
        @Schema(description = "유휴 시간 ID", example = "1")
        Long id,

        @Schema(description = "차량 ID", example = "1")
        Long carId,

        @Schema(description = "유휴 날짜 (yyyy-MM-dd)", example = "2025-08-20")
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate rentalDate,

        @Schema(description = "유휴 시작 시간 (HH:mm)", example = "10:00")
        @JsonFormat(pattern = "HH:mm")
        LocalTime rentalStartTime,

        @Schema(description = "유휴 종료 시간 (HH:mm)", example = "14:00")
        @JsonFormat(pattern = "HH:mm")
        LocalTime rentalEndTime
) {
    public static RentalRes from(Rental rental) {
        return new RentalRes(
                rental.getId(),
                rental.getCar().getId(),
                rental.getRentalDate(),
                rental.getRentalStartTime(),
                rental.getRentalEndTime()
        );
    }
}
