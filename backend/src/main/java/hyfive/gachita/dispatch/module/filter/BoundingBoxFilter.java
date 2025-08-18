package hyfive.gachita.dispatch.module.filter;

import hyfive.gachita.dispatch.dto.CenterDto;
import hyfive.gachita.dispatch.dto.FilterDto;
import hyfive.gachita.dispatch.module.condition.BoundingBoxCondition;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class BoundingBoxFilter implements Filter<BoundingBoxCondition> {

    @Override
    public <T extends FilterDto> List<T> filter(List<T> candidates, BoundingBoxCondition condition) {
        return candidates.stream()
                .filter(c ->
                        c.lat() >= condition.minLat() &&
                                c.lat() <= condition.maxLat() &&
                                c.lng() >= condition.minLng() &&
                                c.lng() <= condition.maxLng()
                )
                .toList();
    }

    public boolean test(CenterDto center, BoundingBoxCondition boundingBoxCondition) {
        return center.lat() >= boundingBoxCondition.minLat() &&
               center.lat() <= boundingBoxCondition.maxLat() &&
               center.lng() >= boundingBoxCondition.minLng() &&
               center.lng() <= boundingBoxCondition.maxLng();
    }
}