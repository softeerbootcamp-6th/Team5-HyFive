package hyfive.gachita.api.kakao.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import hyfive.gachita.api.geocode.dto.LatLng;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "장소(출발지, 목적지, 경유지) 정보")
public record Location(
        @Schema(description = "장소 명칭", example = "카카오판교오피스")
        @JsonProperty("name")
        String name,

        @Schema(description = "경도", example = "127.108640")
        @JsonProperty("x")
        double x,

        @Schema(description = "위도", example = "37.402111")
        @JsonProperty("y")
        double y
) {
    public static Location fromLatLng(LatLng latLng) {
        return new Location(null, latLng.lat(), latLng.lng());
    }

    @Override
    public String toString() {
        return String.format("%.15f,%.15f", x, y);
    }
}
