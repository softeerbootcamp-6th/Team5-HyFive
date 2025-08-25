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

        Pair<LocalTime, LocalTime> deadline,
        Long bookId,                        // 추가
        LocalTime availableRentalStartTime, // 추가
        LocalTime availableRentalEndTime    // 추가
) {
    /**
     * 기존 경로의 node
     */
    public static NodeDto from(Node node, LocalTime deadline, Long bookId,
                               LocalTime availableStart, LocalTime availableEnd) {
        NodeDto.NodeDtoBuilder builder = NodeDto.builder()
                .nodeId(node.getId())
                .lat(node.getLat())
                .lng(node.getLng())
                .time(node.getTime())
                .type(node.getType())
                .bookId(bookId)
                .availableRentalStartTime(availableStart)
                .availableRentalEndTime(availableEnd);

        if (node.getType() == NodeType.END && deadline != null) {
            LocalTime firstDeadline = deadline.minusMinutes(30);
            builder.deadline(Pair.of(firstDeadline, deadline));
        }

        return builder.build();
    }
//    public static NodeDto from(Node node, LocalTime deadline) {
//        NodeDto.NodeDtoBuilder builder = NodeDto.builder()
//                .nodeId(node.getId())
//                .lat(node.getLat())
//                .lng(node.getLng())
//                .time(node.getTime())
//                .type(node.getType());
//
//        if (node.getType() == NodeType.END && deadline != null) {
//            LocalTime firstDeadline = deadline.minusMinutes(30);
//            builder.deadline(Pair.of(firstDeadline, deadline));
//        }
//
//        return builder.build();
//    }

    /**
     * 시작(탑승) 노드
     * deadline = ( (deadline - 30분 - totalDuration) - 2시간, deadline - 30분 - totalDuration )
     */
    public static NodeDto newBookStartNodeFrom(NewBookDto newBook) {
        Duration totalDurationToTime = Duration.ofSeconds(newBook.totalDuration());
        LocalTime endDeadline = newBook.deadline().getFirst().minus(totalDurationToTime);
        LocalTime startDeadline = endDeadline.minusHours(2);

        System.out.println("-----------------------------------");
        System.out.println("-----------------------------------");
        System.out.println("-----------------------------------");

        System.out.println(newBook.deadline().getSecond());
        System.out.println("-----------------------------------");
        System.out.println("-----------------------------------");
        System.out.println("-----------------------------------");

        return NodeDto.builder()
                .nodeId(null) // 신규 노드
                .lat(newBook.startLat())
                .lng(newBook.startLng())
                .time(null)
                .type(NodeType.START)
                .deadline(Pair.of(startDeadline, endDeadline))
                .bookId(newBook.id())
                .build();
    }

    /**
     * 끝(하차) 노드
     * deadline = ( deadline - 30분, deadline )
     */
    public static NodeDto newBookEndNodeFrom(NewBookDto newBook) {

        System.out.println("-----------------------------------");
        System.out.println("-----------------------------------");
        System.out.println("-----------------------------------");

        System.out.println(newBook.deadline().getSecond());
        System.out.println("-----------------------------------");
        System.out.println("-----------------------------------");
        System.out.println("-----------------------------------");


        return NodeDto.builder()
                .nodeId(null) // 신규 노드
                .lat(newBook.endLat())
                .lng(newBook.endLng())
                .time(null)
                .type(NodeType.END)
                .deadline(newBook.deadline())
                .bookId(newBook.id())
                .build();
    }

    /**
     * 기존 NodeDto에서 newTime으로 대체
     */
    public static NodeDto updateTime(NodeDto nodeDto, LocalTime newTime) {
        return NodeDto.builder()
                .nodeId(nodeDto.nodeId())
                .lat(nodeDto.lat())
                .lng(nodeDto.lng())
                .time(newTime)
                .type(nodeDto.type())
                .deadline(nodeDto.deadline())
                .bookId(nodeDto.bookId())
                .availableRentalEndTime(nodeDto.availableRentalEndTime())
                .availableRentalStartTime(nodeDto.availableRentalStartTime())
                .build();
    }
}
