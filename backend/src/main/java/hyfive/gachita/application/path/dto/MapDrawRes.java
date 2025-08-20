package hyfive.gachita.application.path.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record MapDrawRes(
        @Schema(description = "지도에 그릴 경로 정보(폴리라인)", implementation = SegmentDto.class)
        List<SegmentDto> polyline,

        @Schema(description = "지도에 표시할 마커 정보", implementation = MarkerDto.class)
        List<MarkerDto> marker,

        @Schema(description = "강조할 구간 정보", implementation = HighlightDto.class)
        List<HighlightDto> highlight
) {
}
