package hyfive.gachita.dispatch.module.filter.condition;

import lombok.Builder;

@Builder
public record RadiusCondition(
        double centerLat,
        double centerLng,
        double radiusMeters
) implements FilterCondition {
}
