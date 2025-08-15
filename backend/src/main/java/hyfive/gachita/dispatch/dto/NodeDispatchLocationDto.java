package hyfive.gachita.dispatch.dto;

import hyfive.gachita.node.NodeType;
import lombok.Builder;
import org.springframework.data.util.Pair;

import java.time.LocalTime;

@Builder
public record NodeDispatchLocationDto (
        Long nodeId,
        double lat,
        double lng,
        LocalTime time,
        NodeType type,

        Pair<LocalTime, LocalTime> deadline // 도착 보장 시간 <시작, 끝>
) {}
