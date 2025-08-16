package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.module.filter.BoundingBoxFilter;
import hyfive.gachita.dispatch.module.filter.HaversineFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NewPathDispatchFlow {

    private final BoundingBoxFilter boundingBoxFilter;
    private final HaversineFilter haversineFilter;

    // TODO : DispatchLocation -> FilterDto 변경 후 수정
//    public List<DispatchLocation> createPath(double centerLat, double centerLng, double radiusMeters) {
//        // 1. 원본 데이터 가져오기
//        List<DispatchLocation> centerCandidates = centerDispatchLocationProvider.getAll();
//
//        // 2. Bounding Box 조건 생성
//        BoundingBoxCondition bboxCondition = BoundingBoxCondition.from(centerLat, centerLng, radiusMeters);
//
//        // 3. Bounding Box로 1차 필터링
//        List<DispatchLocation> bboxFiltered = boundingBoxFilter.filter(centerCandidates, bboxCondition);
//
//        // 4. Haversine(거리) 조건 생성
//        RadiusCondition radiusCondition = RadiusCondition.builder()
//                .centerLat(centerLat)
//                .centerLng(centerLng)
//                .radiusMeters(radiusMeters)
//                .build();
//
//        // 5. Haversine(거리)로 2차 필터링
//        return haversineFilter.filter(bboxFiltered, radiusCondition);
//    }
}
