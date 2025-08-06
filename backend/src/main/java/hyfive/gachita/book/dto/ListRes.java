package hyfive.gachita.book.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Builder
@Schema(description = "리스트 응답 DTO")
public record ListRes<T>(
        @Schema(description = "현재 페이지의 아이템 목록")
        List<T> items,

        @Schema(description = "현재 페이지")
        int currentPageNum,

        @Schema(description = "전체 페이지 개수")
        int totalPageNum,

        @Schema(description = "전체 아이템 개수")
        long totalItemNum
) {}