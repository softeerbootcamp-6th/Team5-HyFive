package hyfive.gachita.application.path.dto;

import hyfive.gachita.client.geocode.dto.LatLng;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "특정 예약 경로 하이라이트 dto")
public record HighlightDto(
        @Schema(description = "예약 ID", example = "1")
        Long bookId,

        @Schema(description = "시작(탑승) 좌표")
        LatLng start,

        @Schema(description = "종료(하차) 좌표")
        LatLng end,

        @Schema(description = "하이라이트 구간에 포함된 세그먼트 ID 리스트", example = "[2,3,4]")
        int[] segmentList
) {
}
