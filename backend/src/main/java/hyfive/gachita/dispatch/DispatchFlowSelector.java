package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.DispatchResult;
import hyfive.gachita.dispatch.dto.FilteredPathDto;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.module.condition.BoundingBoxCondition;
import hyfive.gachita.dispatch.module.condition.RadiusCondition;
import hyfive.gachita.dispatch.module.filter.BoundingBoxFilter;
import hyfive.gachita.dispatch.module.filter.HaversineFilter;
import hyfive.gachita.dispatch.module.provider.FilteredPathProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
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

    private final int RADIUS_METERS = 3000;
    private final FilteredPathProvider filteredPathProvider;
    private final BoundingBoxFilter boundingBoxFilter;
    private final HaversineFilter haversineFilter;
    private final NewPathDispatchFlow newPathDispatchFlow;
    private final OldPathDispatchFlow oldPathDispatchFlow;

    public DispatchResult execute(NewBookDto newBookDto){
        log.info("========= 배차 필터링 시작 =========");
        List<FilteredPathDto> candidates = filteredPathProvider.getByCondition(newBookDto.hospitalDate());
        log.info("초기 필터링(날짜 기준)된 후보 경로: {}개", candidates.size());

        BoundingBoxCondition bbConditionStart = BoundingBoxCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);
        BoundingBoxCondition bbConditionEnd = BoundingBoxCondition.from(newBookDto.endLat(), newBookDto.endLng(), RADIUS_METERS);
        RadiusCondition rConditionStart = RadiusCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);
        RadiusCondition rConditionEnd = RadiusCondition.from(newBookDto.endLat(), newBookDto.endLng(), RADIUS_METERS);

        // 출발지 반경 필터링
        List<FilteredPathDto> hFilteredStart = candidates.stream()
                .filter(candidate -> boundingBoxFilter.test(candidate, bbConditionStart))
                .filter(candidate -> haversineFilter.test(candidate, rConditionStart))
                .toList();
        log.info("[출발지 필터링] 반경 {}m 이내 경로: {}개", RADIUS_METERS, hFilteredStart.size());
        log.debug(" -> 출발지 필터링 통과 Path IDs: {}", hFilteredStart);


        // 도착지 반경 필터링
        List<FilteredPathDto> hFilteredEnd = candidates.stream()
                .filter(candidate -> boundingBoxFilter.test(candidate, bbConditionEnd))
                .filter(candidate -> haversineFilter.test(candidate, rConditionEnd))
                .toList();
        log.info("[도착지 필터링] 반경 {}m 이내 경로: {}개", RADIUS_METERS, hFilteredEnd.size());
        log.debug(" -> 도착지 필터링 통과 Path IDs: {}", hFilteredEnd);

        // 합집합 PathId 추출
        Set<Long> candidatePathIds = Stream.concat(
                hFilteredStart.stream().map(FilteredPathDto::pathId),
                hFilteredEnd.stream().map(FilteredPathDto::pathId)
        ).collect(Collectors.toSet());

        log.info("[최종 합집합] 총 후보 경로: {}개", candidatePathIds.size());
        log.debug(" -> 최종 후보 Path IDs: {}", candidatePathIds);
        log.info("========= 배차 필터링 종료 =========");

        if (candidatePathIds.isEmpty()) {
            log.info("신규 경로 배차 실행");
            return newPathDispatchFlow.execute(newBookDto);
        } else {
            log.info("기존 경로 배차 실행");
            oldPathDispatchFlow.execute(new ArrayList<>(candidatePathIds), newBookDto);
            return null;
        }
    }
}
