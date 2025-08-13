package hyfive.gachita.dispatch.module.filter;

import hyfive.gachita.dispatch.module.filter.condition.BoundingBoxCondition;
import hyfive.gachita.dispatch.dto.DispatchLocation;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class BoundingBoxFilter implements Filter<BoundingBoxCondition> {

    @Override
    public List<DispatchLocation> filter(List<DispatchLocation> candidates, BoundingBoxCondition condition) {
        return candidates.stream()
                .filter(c ->
                        c.lat() >= condition.minLat() &&
                        c.lat() <= condition.maxLat() &&
                        c.lng() >= condition.minLng() &&
                        c.lng() <= condition.maxLng()
                )
                .collect(Collectors.toList());
    }
}