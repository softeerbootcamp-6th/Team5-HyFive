package hyfive.gachita.dispatch.module.filter;

import hyfive.gachita.dispatch.module.filter.condition.BoundingBoxCondition;
import hyfive.gachita.dispatch.dto.DispatchLocation;
import hyfive.gachita.dispatch.module.filter.condition.RadiusCondition;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class BoundingBoxFilter implements Filter<RadiusCondition> {

    private static final double EARTH_RADIUS_METERS = 6371000; // 단위 : meters

    private BoundingBoxCondition calculateBoundingBox(double centerLat, double centerLng, double radiusMeters) {
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

    @Override
    public List<DispatchLocation> filter(List<DispatchLocation> candidates, RadiusCondition condition) {
        BoundingBoxCondition bbCondition = calculateBoundingBox(condition.centerLat(), condition.centerLng(), condition.radiusMeters());
        return candidates.stream()
                .filter(c ->
                        c.lat() >= bbCondition.minLat() &&
                        c.lat() <= bbCondition.maxLat() &&
                        c.lng() >= bbCondition.minLng() &&
                        c.lng() <= bbCondition.maxLng()
                )
                .collect(Collectors.toList());
    }
}