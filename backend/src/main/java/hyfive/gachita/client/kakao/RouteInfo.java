package hyfive.gachita.client.kakao;

import hyfive.gachita.client.geocode.dto.LatLng;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Schema(description = "경로 탐색 결과 정보")
@Builder
public record RouteInfo(
        @Schema(description = "전체 경로 소요 시간 (s)", example = "4321")
        int totalDuration,

        @Schema(description = "전체 경로 거리 (m)", example = "4321")
        int totalDistance,

        @Schema(description = "구간별 경로 좌표 리스트")
        List<List<LatLng>> polylineList,

        @Schema(description = "구간별 거리 리스트 (m)")
        List<Integer> distanceList,

        @Schema(description = "구간별 소요 시간 리스트 (s)")
        List<Integer> durationList
) {}