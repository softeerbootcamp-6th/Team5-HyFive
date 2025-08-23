package hyfive.gachita.dispatch.module.filter;

import hyfive.gachita.dispatch.dto.FilterDto;
import hyfive.gachita.dispatch.module.condition.BoundingBoxCondition;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@Slf4j
public class BoundingBoxFilter implements Filter<BoundingBoxCondition> {

    @Override
    public <T extends FilterDto> List<T> filter(List<T> candidates, BoundingBoxCondition condition) {
        log.debug("BoundingBox 필터링 시작. 후보: {}개, 조건: {}", candidates.size(), condition);
        List<T> filteredList = candidates.stream()
                .filter(c ->
                        c.lat() >= condition.minLat() &&
                                c.lat() <= condition.maxLat() &&
                                c.lng() >= condition.minLng() &&
                                c.lng() <= condition.maxLng()
                )
                .toList();
        log.debug("BoundingBox 필터링 완료. 필터링된 후보: {}개", filteredList.size());
        return filteredList;
    }

    public boolean test(FilterDto center, BoundingBoxCondition boundingBoxCondition) {
        boolean result = center.lat() >= boundingBoxCondition.minLat() &&
               center.lat() <= boundingBoxCondition.maxLat() &&
               center.lng() >= boundingBoxCondition.minLng() &&
               center.lng() <= boundingBoxCondition.maxLng();
        log.debug("BoundingBox 개별 테스트: {}, center: {}, condition: {}", result, center, boundingBoxCondition);
        return result;
    }
}
