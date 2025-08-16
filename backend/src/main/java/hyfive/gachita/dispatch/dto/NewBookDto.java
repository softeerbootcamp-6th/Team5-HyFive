package hyfive.gachita.dispatch.dto;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 신규 예약 정보 DTO -> dispatch algorithm 내에서 사용
 */
public record NewBookDto (
        Long id,
        LocalDate hospitalDate,
        LocalTime deadline,
        double startLat,
        double startLng,
        double endLat,
        double endLng
) {
}
