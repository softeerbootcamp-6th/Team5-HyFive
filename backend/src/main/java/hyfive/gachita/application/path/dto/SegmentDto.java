package hyfive.gachita.application.path.dto;

import hyfive.gachita.client.geocode.dto.LatLng;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Builder
@Schema(description = "polyline을 그리기 위한 dto")
public record SegmentDto(
        @Schema(description = "세그먼트 ID", example = "1")
        Long segmentId,

        @Schema(description = "세그먼트에 포함된 좌표 리스트", implementation = LatLng.class)
        List<LatLng> pointList
) {
}
