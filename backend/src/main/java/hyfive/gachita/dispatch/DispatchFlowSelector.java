package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.FilteredPathDto;
import hyfive.gachita.dispatch.module.condition.BoundingBoxCondition;
import hyfive.gachita.dispatch.module.condition.RadiusCondition;
import hyfive.gachita.dispatch.module.filter.BoundingBoxFilter;
import hyfive.gachita.dispatch.module.filter.HaversineFilter;
import hyfive.gachita.dispatch.module.provider.PathCandidateProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * 배차 모드 선택
 * 1) NewPathDispatchFlow : 신규 경로 배차 플로우
 * 2) OldPathDispatchFlow : 기존 경로 배차 플로우
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DispatchFlowSelector {

    private final int RADIUS_METERS = 500;
    private final PathCandidateProvider pathCandidateProvider;
    private final BoundingBoxFilter boundingBoxFilter;
    private final HaversineFilter haversineFilter;

    public void execute(NewBookDto newBookDto){
        List<FilteredPathDto> candidates = pathCandidateProvider.getByCondition(newBookDto.hospitalDate());

        BoundingBoxCondition bbConditionStart = BoundingBoxCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);
        BoundingBoxCondition bbConditionEnd = BoundingBoxCondition.from(newBookDto.endLat(), newBookDto.endLng(), RADIUS_METERS);
        RadiusCondition rConditionStart = RadiusCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);
        RadiusCondition rConditionEnd = RadiusCondition.from(newBookDto.endLat(), newBookDto.endLng(), RADIUS_METERS);

        // 출발지 반경 필터링
        List<FilteredPathDto> hFilteredStart = candidates.stream()
                .filter(candidate -> boundingBoxFilter.test(candidate, bbConditionStart))
                .filter(candidate -> haversineFilter.test(candidate, rConditionStart))
                .toList();

        // 도착지 반경 필터링
        List<FilteredPathDto> hFilteredEnd = candidates.stream()
                .filter(candidate -> boundingBoxFilter.test(candidate, bbConditionEnd))
                .filter(candidate -> haversineFilter.test(candidate, rConditionEnd))
                .toList();

        // 합집합 PathId 추출
        Set<Long> candidatePathIds = Stream.concat(
                hFilteredStart.stream().map(FilteredPathDto::pathId),
                hFilteredEnd.stream().map(FilteredPathDto::pathId)
        ).collect(Collectors.toSet());

        if (candidatePathIds.isEmpty()) {
            log.info("신규 경로 배차 실행");
//            newPathDispatchFlow.execute(newBookDto);
        } else {
            log.info("기존 경로 배차 실행");
//            oldPathDispatchFlow.execute(new ArrayList<>(candidatePathIds), newBookDto);
        }
    }

}
