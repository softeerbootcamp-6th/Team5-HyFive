package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.*;
import hyfive.gachita.dispatch.excepion.DispatchException;
import hyfive.gachita.dispatch.module.calculator.RadiusExpandCalculator;
import hyfive.gachita.dispatch.module.checker.FinalNewPathChecker;
import hyfive.gachita.dispatch.module.condition.BoundingBoxCondition;
import hyfive.gachita.dispatch.module.condition.RadiusCondition;
import hyfive.gachita.dispatch.module.filter.BoundingBoxFilter;
import hyfive.gachita.dispatch.module.filter.HaversineFilter;
import hyfive.gachita.dispatch.module.provider.CenterListProvider;
import hyfive.gachita.dispatch.module.provider.IdleCarListProvider;
import hyfive.gachita.dispatch.module.provider.RouteInfoProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class NewPathDispatchFlow {

    private final CenterListProvider centerListProvider;
    private final IdleCarListProvider idleCarListProvider;
    private final RouteInfoProvider routeInfoProvider;
    private final BoundingBoxFilter boundingBoxFilter;
    private final HaversineFilter haversineFilter;
    private final FinalNewPathChecker finalNewPathChecker;

    private final RadiusExpandCalculator radiusExpandCalculator;

//    private final static int RADIUS_METERS = 3000;

    public DispatchResult execute(NewBookDto newBookDto) {
        log.info("========= [NewPathDispatchFlow] 신규 경로 배차 로직 시작 =========");
//        log.info("--- STEP 1: 반경 내 센터 필터링 (반경: {}m) ---", RADIUS_METERS);
//        BoundingBoxCondition boundingBoxCondition = BoundingBoxCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);
//        RadiusCondition radiusCondition = RadiusCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);
//
//        List<FilteredCenterDto> filteredCenterList = centerListProvider.getAll().stream()
//                .filter(center -> boundingBoxFilter.test(center, boundingBoxCondition))
//                .filter(center -> haversineFilter.test(center, radiusCondition))
//                .toList();

        final double newBookLat = newBookDto.startLat();
        final double newBookLng = newBookDto.startLng();

        List<FilteredCenterDto> filteredCenterList =
                radiusExpandCalculator.expandUntilEnough(
                        newBookLat, newBookLng,
                        centerListProvider.getAll(),
                        (center, rCond) -> {
                            BoundingBoxCondition bb = BoundingBoxCondition.from(newBookLat, newBookLng, rCond.radiusMeters());
                            return boundingBoxFilter.test(center, bb)
                                    && haversineFilter.test(center, rCond);
                        }
                );

        log.info("STEP 1 완료: 필터링된 센터 {}개", filteredCenterList.size());
        if (log.isDebugEnabled()) {
            filteredCenterList.forEach(c -> log.debug(" -> 필터링된 센터: {}", c));
        }

        if (filteredCenterList.isEmpty()) {
            throw new DispatchException("배차 가능한 센터가 없습니다.");
        }

        log.info("--- STEP 2: 유휴 차량 필터링 ---");
        List<CarScheduleDto> filteredScheduleList = idleCarListProvider.getByCondition(filteredCenterList, newBookDto);

        log.info("STEP 2 완료: 필터링된 유휴 차량 {}개", filteredScheduleList.size());
        if (log.isDebugEnabled()) {
            filteredScheduleList.forEach(s -> log.debug(" -> 필터링된 유휴차량: {}", s));
        }

        if (filteredScheduleList.isEmpty()) {
            throw new DispatchException("예약 조건에 맞는 유휴 차량이 없습니다.");
        }

        Map<FilteredCenterDto, List<CarScheduleDto>> scheduleListByCenter = filteredScheduleList.stream()
                        .collect(Collectors.groupingBy(CarScheduleDto::centerDto));

        log.info("--- STEP 3: 최적 경로 탐색 ---");
        List<FinalNewPathDto> allPaths = routeInfoProvider.getAll(scheduleListByCenter, newBookDto);
        log.info("Kakao API 호출 시뮬레이션 총 횟수: {} 회", routeInfoProvider.getApiCallCount());
        log.info("STEP 3 완료: 탐색된 최적 경로 {}개", allPaths.size());

        FinalNewPathDto bestPath = allPaths.stream()
                .filter(finalNewPathChecker::isFirstPathDurationExceed)
                .filter(finalNewPathChecker::isScheduleWithinRentalWindow)
                .max(
                        Comparator
                        .comparingInt(finalNewPathChecker::compareFragmentCount)
                            .thenComparingInt(finalNewPathChecker::compareStartTimeDifference)
                            .thenComparingInt(FinalNewPathDto::totalDuration)
                            .thenComparingInt(FinalNewPathDto::totalDistance)
                )
                .orElseThrow(()
                        -> new DispatchException("운행 시간이 한시간 이상이거나, 예약 시간 내에 운행이 가능한 차량이 없습니다."));

        log.info("최종 선택된 최적 경로 -> Car ID: {}, 소요시간: {}초, 거리: {}m", bestPath.car().getId(), bestPath.totalDuration(), bestPath.totalDistance());
        log.info("========= [NewPathDispatchFlow] 신규 경로 배차 로직 종료 =========");
        return bestPath;
    }
}
