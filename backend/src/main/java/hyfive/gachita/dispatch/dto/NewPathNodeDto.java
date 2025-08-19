package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.node.NodeType;
import org.springframework.data.util.Pair;

import java.time.LocalTime;

public record NewPathNodeDto(
        double lat,
        double lng,
        LocalTime time,
        NodeType type
) {
    public static NewPathNodeDto createStartNode(double lat, double lng, LocalTime time) {
        return new NewPathNodeDto (
                lat,
                lng,
                time,
                NodeType.START
        );
    }

    public static NewPathNodeDto createEndNode(double lat, double lng, LocalTime time) {
        return new NewPathNodeDto (
                lat,
                lng,
                time,
                NodeType.END
        );
    }

    public static NewPathNodeDto createCenterNode(double lat, double lng, LocalTime time) {
        return new NewPathNodeDto (
                lat,
                lng,
                time,
                NodeType.CENTER
        );
    }
}
