package hyfive.gachita.dispatch.dto;

import hyfive.gachita.client.kakao.RouteInfo;
import lombok.Builder;

import java.util.List;

@Builder
public record UpdatedPathDto(
        RouteInfo routeInfo,
        List<NodeDto> updatedNodes
) {
}
