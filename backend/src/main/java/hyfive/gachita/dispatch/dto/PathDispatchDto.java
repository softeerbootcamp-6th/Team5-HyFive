package hyfive.gachita.dispatch.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record PathDispatchDto (
        Long pathId,
        List<NodeDispatchLocationDto> nodes,
        int duration,                        // 단위 : sec : 총 이동 시간
        int distance                         // 단위 : meters
){}
