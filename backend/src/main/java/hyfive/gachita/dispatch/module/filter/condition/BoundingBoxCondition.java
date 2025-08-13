package hyfive.gachita.dispatch.module.filter.condition;

import lombok.Builder;

@Builder
public record BoundingBoxCondition(
        double minLat,
        double maxLat,
        double minLng,
        double maxLng
) implements FilterCondition {}