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

            @Schema(description = "전체 경로 소요 시간(s)", example = "3494")
            @JsonProperty("duration")
            int duration
    ) {}

    @Schema(description = "경로를 구성하는 한 개의 구간(Section)")
    public record Section(
            @Schema(description = "구간 소요 시간(s)", example = "1880")
            @JsonProperty("duration")
            int duration,

            @Schema(description = "구간을 구성하는 도로 목록")
            @JsonProperty("roads")
            List<Road> roads
    ) {}

    @Schema(description = "도로 정보")
    public record Road(
            @Schema(description = "도로명", example = "판교역로241번길")
            @JsonProperty("name")
            String name,

            @Schema(description = "도로 소요 시간(s)", example = "47")
            @JsonProperty("duration")
            int duration,

            @Schema(description = "도로를 구성하는 좌표열 (경도, 위도 순)")
            @JsonProperty("vertexes")
            List<Double> vertexes
    ) {}
}