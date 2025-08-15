package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.DispatchLocation;
import hyfive.gachita.dispatch.module.filter.BoundingBoxFilter;
import hyfive.gachita.dispatch.module.filter.HaversineFilter;
import hyfive.gachita.dispatch.module.filter.condition.BoundingBoxCondition;
import hyfive.gachita.dispatch.module.filter.condition.RadiusCondition;
import hyfive.gachita.dispatch.provider.CenterDispatchLocationProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UnDispatchService {

    private final CenterDispatchLocationProvider centerDispatchLocationProvider;
    private final BoundingBoxFilter boundingBoxFilter;
    private final HaversineFilter haversineFilter;

    public List<DispatchLocation> createPath(double centerLat, double centerLng, double radiusMeters) {
        // 1. 원본 데이터 가져오기
        List<DispatchLocation> centerCandidates = centerDispatchLocationProvider.getAll();

        // 2. Bounding Box 조건 생성
        BoundingBoxCondition bboxCondition = BoundingBoxCondition.from(centerLat, centerLng, radiusMeters);

        // 3. Bounding Box로 1차 필터링
        List<DispatchLocation> bboxFiltered = boundingBoxFilter.filter(centerCandidates, bboxCondition);

        // 4. Haversine(거리) 조건 생성
        RadiusCondition radiusCondition = RadiusCondition.builder()
                .centerLat(centerLat)
                .centerLng(centerLng)
                .radiusMeters(radiusMeters)
                .build();

        // 5. Haversine(거리)로 2차 필터링
        return haversineFilter.filter(bboxFiltered, radiusCondition);
    }
}
