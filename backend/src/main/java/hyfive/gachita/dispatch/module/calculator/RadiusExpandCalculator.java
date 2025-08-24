package hyfive.gachita.dispatch.module.calculator;

import hyfive.gachita.dispatch.dto.RadiusPolicy;
import hyfive.gachita.dispatch.module.condition.RadiusCondition;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.function.BiPredicate;

@Slf4j
@Component
@RequiredArgsConstructor
public class RadiusExpandCalculator {
    private final RadiusPolicy policy;

    public <T> List<T> expandUntilEnough(
            double lat, double lng,
            List<T> candidates,
            BiPredicate<T, RadiusCondition> filter
    ) {
        log.info("반경 확장 계산 시작. 전체 후보: {}개, 최소 필요: {}개 (초기 반경: {}m, 최대: {}m, 증가: {}m)",
                candidates.size(), policy.minNodeCount(), policy.initial(), policy.max(), policy.step());

        int radius = policy.initial();
        List<T> filtered = new ArrayList<>();
        int lastCheckedRadius = 0;

        while (radius <= policy.max()) {
            lastCheckedRadius = radius; // 현재 반복에서 사용할 반경 기록
            RadiusCondition condition = RadiusCondition.from(lat, lng, radius);

            filtered = candidates.stream()
                    .filter(c -> filter.test(c, condition))
                    .toList();

            log.debug(" -> 반경: {}m, 찾은 후보 수: {}개", radius, filtered.size());

            // 최소 필요 후보 수를 충족하면 루프 종료
            if (filtered.size() >= policy.minNodeCount()) {
                log.info("최소 후보 수({})를 충족하여 반경 확장을 종료합니다.", policy.minNodeCount());
                break;
            }

            // 다음 반경으로 증가
            radius += policy.step();
        }

        // 루프 종료 후 최종 결과 로그
        if (filtered.size() < policy.minNodeCount()) {
            log.warn("최대 반경({}m)까지 탐색했지만 최소 후보 수({})를 충족하지 못했습니다.", policy.max(), policy.minNodeCount());
        }

        log.info("반경 확장 계산 종료. 최종 적용 반경: {}m, 최종 후보 수: {}개", lastCheckedRadius, filtered.size());

        return filtered;
    }
}