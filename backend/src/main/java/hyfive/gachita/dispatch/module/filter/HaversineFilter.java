package hyfive.gachita.dispatch.module.filter;

import hyfive.gachita.dispatch.dto.FilterDto;
import hyfive.gachita.dispatch.module.condition.RadiusCondition;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
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
        log.debug("Haversine 필터링 시작. 후보: {}개, 조건: {}", candidates.size(), condition);
        List<T> filteredList = candidates.stream()
                .filter(c ->
                        haversine(condition.centerLat(), condition.centerLng(), c.lat(), c.lng()) <= condition.radiusMeters()
                )
                .toList();
        log.debug("Haversine 필터링 완료. 필터링된 후보: {}개", filteredList.size());
        return filteredList;
    }

    public boolean test(FilterDto center, RadiusCondition radiusCondition) {
        double distance = haversine(radiusCondition.centerLat(), radiusCondition.centerLng(),
                center.lat(), center.lng());
        boolean result = distance <= radiusCondition.radiusMeters();
        log.debug("Haversine 개별 테스트: {}, 거리: {}m, center: {}, condition: {}", result, distance, center, radiusCondition);
        return result;
    }
}
