package hyfive.gachita.application.path.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import hyfive.gachita.application.center.Center;
import hyfive.gachita.application.node.Node;
import hyfive.gachita.application.node.NodeType;
import hyfive.gachita.client.geocode.dto.LatLng;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalTime;

@Builder
@Schema(description = "마커 dto")
public record MarkerRes(
        @Schema(description = "노드 ID", example = "1")
        Long nodeId,

        @Schema(description = "예약 ID(센터 노드의 경우 null)", example = "1")
        Long bookId,

        @Schema(description = "예약자 이름 또는 센터 이름", example = "김코드")
        String bookName,

        @Schema(description = "노드 좌표 (lat, lng)", implementation = LatLng.class)
        LatLng point,

        @Schema(description = "해당 노드를 지나는 예상 시간 (HH:mm)", example = "10:00")
        @JsonFormat(pattern = "HH:mm")
        LocalTime time,

        @Schema(description = "노드 타입 (CENTER, START, END)", example = "START")
        NodeType type
) {
    // 센터 마커 생성
    public static MarkerRes from(Center center, Node node) {
        return new MarkerRes(
                node.getId(),
                null, // 센터는 예약 ID 존재 X
                center.getCenterName(),
                new LatLng(node.getLat(), node.getLng()),
                node.getTime(),
                node.getType()
        );
    }

    // 탑승자 마커 생성
    public static MarkerRes from(Node node) {
        return new MarkerRes(
                node.getId(),
                node.getBook().getId(),
                node.getBook().getBookName(),
                new LatLng(node.getLat(), node.getLng()),
                node.getTime(),
                node.getType()
        );
    }
}
