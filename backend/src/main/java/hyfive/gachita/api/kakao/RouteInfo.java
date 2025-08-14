package hyfive.gachita.api.kakao;

import hyfive.gachita.api.geocode.dto.LatLng;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Schema(description = "경로 탐색 결과 정보")
@Builder
public record RouteInfo(
        @Schema(description = "총 소요 시간 (초)", example = "4321")
        int totalTime,

        @Schema(description = "구간별 경로 좌표 리스트")
        List<List<LatLng>> polylineList
) {}
