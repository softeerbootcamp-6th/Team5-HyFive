package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.client.kakao.RouteInfo;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 신규 예약 정보 DTO -> dispatch algorithm 내에서 사용
 */
@Builder
public record NewBookDto (
        Long id,
        LocalDate hospitalDate,
        LocalTime deadline,
        double startLat,
        double startLng,
        double endLat,
        double endLng,
        boolean walker,

        // TODO : 카카오 API 호출 시 값 설정 필요
        LocalTime maybeOnTime,

        int totalDuration,
        int totalDistance
) {
    public static NewBookDto from(Book book, RouteInfo routeInfo) {
        return NewBookDto.builder()
                .id(book.getId())
                .hospitalDate(book.getHospitalDate())
                .deadline(book.getDeadline())
                .startLat(book.getStartLat())
                .startLng(book.getStartLng())
                .endLat(book.getEndLat())
                .endLng(book.getEndLng())
                .walker(book.getWalker())
                .totalDuration(routeInfo.totalDuration())
                .totalDistance(routeInfo.totalDistance())
                .build();
    }
}
