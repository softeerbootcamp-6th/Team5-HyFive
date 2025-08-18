package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.node.NodeType;
import org.springframework.data.util.Pair;

import java.time.LocalTime;

public record NewNodeDispatchLocationDto(
        double lat,
        double lng,
        LocalTime time,
        NodeType type,

        Pair<LocalTime, LocalTime> deadline // 도착 보장 시간 <시작, 끝>
) {
}
