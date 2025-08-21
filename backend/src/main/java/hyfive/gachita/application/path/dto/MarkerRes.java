package hyfive.gachita.application.path.dto;

import hyfive.gachita.application.center.Center;
import hyfive.gachita.application.node.Node;
import hyfive.gachita.application.node.NodeType;
import hyfive.gachita.client.geocode.dto.LatLng;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "마커 dto")
public record MarkerRes(
        @Schema(description = "노드 ID", example = "1")
        Long nodeId,

        @Schema(description = "예약 ID(센터 노드의 경우 null)", example = "1")
        Long bookId,

        @Schema(description = "노드 좌표 (lat, lng)", implementation = LatLng.class)
        LatLng point,

        @Schema(description = "노드 타입 (CENTER, START, END)", example = "START")
        NodeType type
) {
    public static MarkerRes from(Node node) {
        // 센터의 경우, bookId는 null
        Long bookId = node.getType() == NodeType.CENTER ? null : node.getBook().getId();

        return new MarkerRes(
                node.getId(),
                bookId,
                new LatLng(node.getLat(), node.getLng()),
                node.getType()
        );
    }
}
