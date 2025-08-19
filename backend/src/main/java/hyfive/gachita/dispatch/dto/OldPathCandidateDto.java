package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.node.Node;
import lombok.Builder;

import java.util.List;

@Builder
public record OldPathCandidateDto(
        Long pathId,
        Long carId,
        List<NodeDto> nodes,
        int duration,                        // 단위 : sec : 총 이동 시간
        int distance                         // 단위 : meters
) {
    public static OldPathCandidateDto from(Long pathId, Long carId, List<Node> nodeList) {
        List<NodeDto> nodeDtoList = nodeList.stream()
                .map(NodeDto::from)
                .toList();

        return OldPathCandidateDto.builder()
                .pathId(pathId)
                .carId(carId)
                .nodes(nodeDtoList)
                .build();
    }
}
