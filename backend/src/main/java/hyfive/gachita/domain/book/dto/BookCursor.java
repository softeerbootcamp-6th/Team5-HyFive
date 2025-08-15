package hyfive.gachita.domain.book.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalDateTime;

@Schema(description = "예약 리스트 스크롤 조회를 위한 커서 DTO")
@Builder
public record BookCursor(

        @Schema(description = "마지막 조회된 예약 ID (생성일시가 같은 경우 비교용)", nullable = true)
        Long lastId,

        @Schema(description = "마지막 조회된 예약 생성일시 (yyyy-MM-dd'T'HH:mm:ss)", nullable = true)
        LocalDateTime lastCreatedAt
) {}