package hyfive.gachita.application.path.dto;

import hyfive.gachita.client.kakao.dto.response.KakaoNaviRes;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Builder
@Schema(description = "지도를 그리기 위한 정보 dto")
public record MapDrawRes(
        @Schema(description = "지도에 그릴 경로 정보(폴리라인)", implementation = SegmentRes.class)
        List<SegmentRes> polyline,

        @Schema(description = "지도에 표시할 마커 정보", implementation = MarkerRes.class)
        List<MarkerRes> marker,

        @Schema(description = "강조할 구간 정보", implementation = HighlightRes.class)
        List<HighlightRes> highlight,

        @Schema(description = "지도 경계 정보", implementation = KakaoNaviRes.Bound.class)
        KakaoNaviRes.Bound bound
) {
}
