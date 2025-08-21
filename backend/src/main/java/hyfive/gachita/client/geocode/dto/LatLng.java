package hyfive.gachita.client.geocode.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "좌표 dto")
public record LatLng(
        @Schema(description = "위도 ", example = "37.715133")
        double lat,

        @Schema(description = "경도", example = "126.734086")
        double lng
) {}
