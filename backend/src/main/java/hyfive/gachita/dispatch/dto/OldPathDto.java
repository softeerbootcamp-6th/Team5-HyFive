package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.path.dto.NodeWithDeadline;
import lombok.Builder;

import java.util.List;

@Builder
public record OldPathDto(
        Long pathId,
        Long carId,
        List<NodeDto> nodes,
        int duration,                        // 단위 : sec : 총 이동 시간
        int distance                         // 단위 : meters
) {
    public static OldPathDto from(Long pathId, Long carId, List<NodeWithDeadline> nodeList) {
        List<NodeDto> nodeDtoList = nodeList.stream()
                .map(nwd -> NodeDto.from(nwd.node(), nwd.deadline()))
                .toList();

        return OldPathDto.builder()
                .pathId(pathId)
                .carId(carId)
                .nodes(nodeDtoList)
                .build();
    }
}
