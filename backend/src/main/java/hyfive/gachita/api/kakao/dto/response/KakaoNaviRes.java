package hyfive.gachita.api.kakao.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import hyfive.gachita.api.kakao.dto.Location;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "카카오 내비 경로 탐색 API 응답")
public record KakaoNaviRes(
        @Schema(description = "트랜잭션 ID", example = "01948280a50d700d945a8ec5c132709d")
        @JsonProperty("trans_id")
        String transId,

        @Schema(description = "탐색된 경로 목록")
        List<Route> routes
) {

    @Schema(description = "경로(Route) 정보")
    public record Route(
            @Schema(description = "결과 코드 (0: 성공)", example = "0")
            @JsonProperty("result_code")
            int resultCode,

            @Schema(description = "결과 메시지", example = "길찾기 성공")
            @JsonProperty("result_msg")
            String resultMsg,

            @Schema(description = "경로 요약 정보")
            Summary summary,

            @Schema(description = "경로 구간 목록")
            List<Section> sections
    ) {}

    @Schema(description = "경로 요약 정보")
    public record Summary(
            @Schema(description = "출발지 정보")
            @JsonProperty("origin")
            Location origin,

            @Schema(description = "목적지 정보")
            @JsonProperty("destination")
            Location destination,

            @Schema(description = "경유지 목록")
            @JsonProperty("waypoints")
            List<Location> waypoints,

            @Schema(description = "경로 탐색 우선순위", example = "RECOMMEND")
            @JsonProperty("priority")
            String priority,

            @Schema(description = "전체 경로 거리(m)", example = "19032")
            @JsonProperty("distance")
            int distance,

            @Schema(description = "전체 경로 소요 시간(s)", example = "3494")
            @JsonProperty("duration")
            int duration,

            @Schema(description = "요금 정보")
            @JsonProperty("fare")
            Fare fare,

            @Schema(description = "경로를 포함하는 사각 영역 정보")
            @JsonProperty("bound")
            Bound bound
    ) {}

    @Schema(description = "경로를 구성하는 한 개의 구간(Section)")
    public record Section(
            @Schema(description = "구간 거리(m)", example = "10035")
            @JsonProperty("distance")
            int distance,

            @Schema(description = "구간 소요 시간(s)", example = "1880")
            @JsonProperty("duration")
            int duration,

            @Schema(description = "구간을 포함하는 사각 영역 정보")
            @JsonProperty("bound")
            Bound bound,

            @Schema(description = "구간을 구성하는 도로 목록")
            @JsonProperty("roads")
            List<Road> roads,

            @Schema(description = "구간의 길안내 정보 목록")
            @JsonProperty("guides")
            List<Guide> guides
    ) {}

    @Schema(description = "도로 정보")
    public record Road(
            @Schema(description = "도로명", example = "판교역로241번길")
            @JsonProperty("name")
            String name,

            @Schema(description = "도로 거리(m)", example = "186")
            @JsonProperty("distance")
            int distance,

            @Schema(description = "도로 소요 시간(s)", example = "47")
            @JsonProperty("duration")
            int duration,

            @Schema(description = "교통 정보(km/h)", example = "14")
            @JsonProperty("traffic_speed")
            double trafficSpeed,

            @Schema(description = "교통 상태 (0: 정보 없음, 1: 원활, 2: 서행, 3: 정체, 4: 통제)", example = "2")
            @JsonProperty("traffic_state")
            int trafficState,

            @Schema(description = "도로를 구성하는 좌표열 (경도, 위도 순)")
            @JsonProperty("vertexes")
            List<Double> vertexes
    ) {}

    @Schema(description = "길안내 지점 정보")
    public record Guide(
            @Schema(description = "안내 명칭", example = "출발지")
            @JsonProperty("name")
            String name,

            @Schema(description = "안내 지점 경도", example = "127.10763122680424")
            @JsonProperty("x")
            double x,

            @Schema(description = "안내 지점 위도", example = "37.40241072822385")
            @JsonProperty("y")
            double y,

            @Schema(description = "다음 안내 지점까지의 거리(m)", example = "0")
            @JsonProperty("distance")
            int distance,

            @Schema(description = "다음 안내 지점까지의 소요 시간(s)", example = "0")
            @JsonProperty("duration")
            int duration,

            @Schema(description = "안내 종류 (e.g., 1: 직진, 3: 좌회전, 100: 출발지, 1000: 경유지)", example = "100")
            @JsonProperty("type")
            int type,

            @Schema(description = "안내 문구", example = "출발지")
            @JsonProperty("guidance")
            String guidance,

            @Schema(description = "해당 안내가 포함된 도로의 인덱스 (sections.roads)", example = "0")
            @JsonProperty("road_index")
            int roadIndex
    ) {}

    @Schema(description = "요금 정보")
    public record Fare(
            @Schema(description = "택시 요금(원)", example = "22200")
            @JsonProperty("taxi")
            int taxi,

            @Schema(description = "통행료(원)", example = "0")
            @JsonProperty("toll")
            int toll
    ) {}

    @Schema(description = "지도상의 사각 영역 정보")
    public record Bound(
            @Schema(description = "최소 경도", example = "127.10699672876241")
            @JsonProperty("min_x")
            double minX,

            @Schema(description = "최소 위도", example = "37.35782058991495")
            @JsonProperty("min_y")
            double minY,

            @Schema(description = "최대 경도", example = "127.17437025337696")
            @JsonProperty("max_x")
            double maxX,

            @Schema(description = "최대 위도", example = "37.40371556711698")
            @JsonProperty("max_y")
            double maxY
    ) {}
}