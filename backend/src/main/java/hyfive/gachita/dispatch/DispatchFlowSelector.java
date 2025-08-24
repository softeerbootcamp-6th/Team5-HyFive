package hyfive.gachita.dispatch;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.path.Path;
import hyfive.gachita.application.path.PathService;
import hyfive.gachita.dispatch.dto.DispatchResult;
import hyfive.gachita.dispatch.dto.FilteredPathDto;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.excepion.DispatchErrorCode;
import hyfive.gachita.dispatch.excepion.DispatchException;
import hyfive.gachita.dispatch.module.calculator.RadiusExpandCalculator;
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

    private final FilteredPathProvider filteredPathProvider;
    private final BoundingBoxFilter boundingBoxFilter;
    private final HaversineFilter haversineFilter;
    private final NewPathDispatchFlow newPathDispatchFlow;
    private final OldPathDispatchFlow oldPathDispatchFlow;
    private final RadiusExpandCalculator radiusExpandCalculator;

    //    private final int RADIUS_METERS = 1000;

    public DispatchResult execute(NewBookDto newBookDto){
        log.info("========= Dispatch Flow Selector 필터링 시작 =========");
        List<FilteredPathDto> candidates = filteredPathProvider.getByCondition(newBookDto.hospitalDate());
        log.info("초기 필터링(날짜 기준)된 후보 경로: {}개", candidates.size());

//        BoundingBoxCondition bbConditionStart = BoundingBoxCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);
//        BoundingBoxCondition bbConditionEnd = BoundingBoxCondition.from(newBookDto.endLat(), newBookDto.endLng(), RADIUS_METERS);
//        RadiusCondition rConditionStart = RadiusCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);
//        RadiusCondition rConditionEnd = RadiusCondition.from(newBookDto.endLat(), newBookDto.endLng(), RADIUS_METERS);

//        // 출발지 반경 필터링
//        List<FilteredPathDto> hFilteredStart = candidates.stream()
//                .filter(candidate -> boundingBoxFilter.test(candidate, bbConditionStart))
//                .filter(candidate -> haversineFilter.test(candidate, rConditionStart))
//                .toList();
//        log.info("[출발지 필터링] 반경 {}m 이내 경로: {}개", RADIUS_METERS, hFilteredStart.size());
//        log.debug(" -> 출발지 필터링 통과 Path IDs: {}", hFilteredStart);

//        // 도착지 반경 필터링
//        List<FilteredPathDto> hFilteredEnd = candidates.stream()
//                .filter(candidate -> boundingBoxFilter.test(candidate, bbConditionEnd))
//                .filter(candidate -> haversineFilter.test(candidate, rConditionEnd))
//                .toList();
//        log.info("[도착지 필터링] 반경 {}m 이내 경로: {}개", RADIUS_METERS, hFilteredEnd.size());
//        log.debug(" -> 도착지 필터링 통과 Path IDs: {}", hFilteredEnd);

        final double sLat = newBookDto.startLat();
        final double sLng = newBookDto.startLng();
        final double eLat = newBookDto.endLat();
        final double eLng = newBookDto.endLng();

        List<FilteredPathDto> hFilteredStart =
                radiusExpandCalculator.expandUntilEnough(
                        sLat, sLng, candidates,
                        (candidate, rCond) -> {
                            // rCond에서 현재 반경을 꺼낼 수 있다는 가정 (예: rCond.radius())
                            BoundingBoxCondition bb = BoundingBoxCondition.from(sLat, sLng, rCond.radiusMeters());
                            return boundingBoxFilter.test(candidate, bb)
                                    && haversineFilter.test(candidate, rCond);
                        }
                );
        log.info("[출발지 필터링] (동적 반경) 후보: {}개", hFilteredStart.size());

        List<FilteredPathDto> hFilteredEnd =
                radiusExpandCalculator.expandUntilEnough(
                        eLat, eLng, candidates,
                        (candidate, rCond) -> {
                            BoundingBoxCondition bb = BoundingBoxCondition.from(eLat, eLng, rCond.radiusMeters());
                            return boundingBoxFilter.test(candidate, bb)
                                    && haversineFilter.test(candidate, rCond);
                        }
                );
        log.info("[도착지 필터링] (동적 반경) 후보: {}개", hFilteredEnd.size());

        // 합집합 PathId 추출
        Set<Long> candidatePathIds = Stream.concat(
                hFilteredStart.stream().map(FilteredPathDto::pathId),
                hFilteredEnd.stream().map(FilteredPathDto::pathId)
        ).collect(Collectors.toSet());

        log.info("[최종 합집합] 총 후보 경로: {}개", candidatePathIds.size());
        log.debug(" -> 최종 후보 Path IDs: {}", candidatePathIds);
        log.info("========= Dispatch Flow Selector 필터링 종료 =========");

        try {
            log.info("Old Path Dispatch Flow 실행");
            return oldPathDispatchFlow.execute(new ArrayList<>(candidatePathIds), newBookDto);
        } catch (DispatchException e) {
            if (e.getErrorCode() == DispatchErrorCode.CANDIDATE_EMPTY) {
                log.info("Old Path Dispatch Flow 배차 후보 0개 → 신규 경로 배차 실행");
                return newPathDispatchFlow.execute(newBookDto);
            }
            throw e;
        }
    }
}
