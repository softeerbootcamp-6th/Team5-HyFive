package hyfive.gachita.dispatch.module.filter;

import hyfive.gachita.dispatch.dto.FilterDto;
import hyfive.gachita.dispatch.module.condition.RadiusCondition;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class HaversineFilter implements Filter<RadiusCondition> {

    private static final double EARTH_RADIUS = 6371000; // 단위 : meters

    private double haversine(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);

        return 2 * EARTH_RADIUS * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    @Override
    public <T extends FilterDto> List<T> filter(List<T> candidates, RadiusCondition condition) {
        return candidates.stream()
                .filter(c ->
                        haversine(condition.centerLat(), condition.centerLng(), c.lat(), c.lng()) <= condition.radiusMeters()
                )
                .toList();
    }
}
