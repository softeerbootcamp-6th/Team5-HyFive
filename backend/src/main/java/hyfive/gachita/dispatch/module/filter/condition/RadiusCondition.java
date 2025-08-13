package hyfive.gachita.dispatch.module.filter.condition;

public record RadiusCondition(
        double centerLat,
        double centerLng,
        double radiusMeters
) implements FilterCondition {
}
