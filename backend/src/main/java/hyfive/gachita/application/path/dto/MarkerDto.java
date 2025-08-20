package hyfive.gachita.application.path.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import hyfive.gachita.application.node.NodeType;
import hyfive.gachita.client.geocode.dto.LatLng;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalTime;

@Builder
@Schema(description = "마커 dto")
public record MarkerDto(
        @Schema(description = "노드 ID", example = "1")
        Long nodeId,

        @Schema(description = "예약 ID", example = "1")
        Long bookId,

        @Schema(description = "노드 좌표 (lat, lng)", implementation = LatLng.class)
        LatLng point,

        @Schema(description = "해당 노드를 지나는 예상 시간 (HH:mm)", example = "10:00")
        @JsonFormat(pattern = "HH:mm")
        LocalTime time,

        @Schema(description = "노드 타입 (CENTER, START, END)", example = "START")
        NodeType type
) {
}
