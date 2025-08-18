package hyfive.gachita.dispatch.module.condition;

import lombok.Builder;

@Builder
public record BoundingBoxCondition(
        double minLat,
        double maxLat,
        double minLng,
        double maxLng
) implements Condition {
    private static final double EARTH_RADIUS_METERS = 6371000; // 단위 : meters

    public static BoundingBoxCondition from(double centerLat, double centerLng, double radiusMeters) {
        // 위도 1도 = 약 111,320m
        double latDegreeDistance = radiusMeters / 111_320.0;

        // 경도 1도 = 위도에 따라 변함
        double lngDegreeDistance = radiusMeters / (111_320.0 * Math.cos(Math.toRadians(centerLat)));

        double minLat = centerLat - latDegreeDistance;
        double maxLat = centerLat + latDegreeDistance;
        double minLng = centerLng - lngDegreeDistance;
        double maxLng = centerLng + lngDegreeDistance;

        return BoundingBoxCondition.builder()
                .minLat(minLat)
                .maxLat(maxLat)
                .minLng(minLng)
                .maxLng(maxLng)
                .build();
    }
}