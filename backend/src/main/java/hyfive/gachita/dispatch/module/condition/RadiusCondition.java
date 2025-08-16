package hyfive.gachita.dispatch.module.condition;

import lombok.Builder;

@Builder
public record RadiusCondition(
        double centerLat,
        double centerLng,
        double radiusMeters
) implements Condition {
    public static RadiusCondition from(double centerLat, double centerLng, double radiusMeters) {
        return RadiusCondition.builder()
                .centerLat(centerLat)
                .centerLng(centerLng)
                .radiusMeters(radiusMeters)
                .build();
    }
}
