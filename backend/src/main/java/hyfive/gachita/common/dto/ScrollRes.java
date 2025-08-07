package hyfive.gachita.common.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Schema(description = "스크롤 페이징 응답 DTO")
@Builder
public record ScrollRes<T, C>(
        @Schema(description = "현재 페이지에 포함된 아이템 목록")
        List<T> items,

        @Schema(description = "다음 페이지 존재 여부", example = "true")
        boolean hasNext,

        @Schema(description = "마지막 항목의 커서 값 (다음 요청 시 cursorId로 사용)", example = "123")
        C cursor
) {}