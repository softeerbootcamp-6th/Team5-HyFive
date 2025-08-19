package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.node.Node;
import hyfive.gachita.application.node.NodeType;
import lombok.Builder;
import org.springframework.data.util.Pair;

import java.time.LocalTime;
import java.time.Duration;

@Builder
public record NodeDto(
        Long nodeId, // (기존 노드는 : 값 있음), (신규 노드 : null)
        double lat,
        double lng,
        LocalTime time,
        NodeType type,

        Pair<LocalTime, LocalTime> deadline
) {
    /**
     * 기존 경로의 node
     */
    public static NodeDto from(Node node) {
        return NodeDto.builder()
                .nodeId(node.getId())
                .lat(node.getLat())
                .lng(node.getLng())
                .time(node.getTime())
                .type(node.getType())
                .build();
    }

    /**
     * 시작(탑승) 노드
     * deadline = ( (deadline - 30분 - totalDuration) - 2시간, deadline - 30분 - totalDuration )
     */
    public static NodeDto newBookStartNodeFrom(NewBookDto newBook) {
        Duration totalDurationToTime = Duration.ofSeconds(newBook.totalDuration());
        LocalTime endDeadline = newBook.deadline().minusMinutes(30).minus(totalDurationToTime);
        LocalTime startDeadline = endDeadline.minusHours(2);

        return NodeDto.builder()
                .nodeId(null) // 신규 노드
                .lat(newBook.startLat())
                .lng(newBook.startLng())
                .time(null)
                .type(NodeType.START)
                .deadline(Pair.of(startDeadline, endDeadline))
                .build();
    }

    /**
     * 끝(하차) 노드
     * deadline = ( deadline - 30분, deadline )
     */
    public static NodeDto newBookEndNodeFrom(NewBookDto newBook) {
        return NodeDto.builder()
                .nodeId(null) // 신규 노드
                .lat(newBook.endLat())
                .lng(newBook.endLng())
                .time(null)
                .type(NodeType.END)
                .deadline(Pair.of(newBook.deadline().minusMinutes(30), newBook.deadline()))
                .build();
    }
}
