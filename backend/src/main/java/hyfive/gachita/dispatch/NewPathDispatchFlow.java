package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.CarScheduleDto;
import hyfive.gachita.dispatch.dto.FilteredCenterDto;
import hyfive.gachita.dispatch.dto.FinalNewPathDto;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.excepion.DispatchException;
import hyfive.gachita.dispatch.module.condition.BoundingBoxCondition;
import hyfive.gachita.dispatch.module.condition.RadiusCondition;
import hyfive.gachita.dispatch.module.filter.BoundingBoxFilter;
import hyfive.gachita.dispatch.module.filter.FinalNewPathValidator;
import hyfive.gachita.dispatch.module.filter.HaversineFilter;
import hyfive.gachita.dispatch.module.provider.CenterListProvider;
import hyfive.gachita.dispatch.module.provider.IdleCarListProvider;
import hyfive.gachita.dispatch.module.provider.RouteInfoProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class NewPathDispatchFlow {
    private final CenterListProvider centerListProvider;
    private final IdleCarListProvider idleCarListProvider;
    private final RouteInfoProvider routeInfoProvider;
    private final BoundingBoxFilter boundingBoxFilter;
    private final HaversineFilter haversineFilter;
    private final FinalNewPathValidator finalNewPathValidator;
    private final FinalNewPathSelector finalNewPathSelector;

    private final static int RADIUS_METERS = 500;

    public void execute(NewBookDto newBookDto) {
        // center 정보
        BoundingBoxCondition boundingBoxCondition = BoundingBoxCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);
        RadiusCondition radiusCondition = RadiusCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);

        List<FilteredCenterDto> filteredCenterList = centerListProvider.getAll().stream()
                .filter(center -> boundingBoxFilter.test(center, boundingBoxCondition))
                .filter(center -> haversineFilter.test(center, radiusCondition))
                .toList();
        log.info("Filtered centers: {}", filteredCenterList.size());
        if (filteredCenterList.isEmpty()) {
            throw new DispatchException("배차 가능한 센터가 없습니다.");
        }

        // car, rental 정보
        List<CarScheduleDto> filteredScheduleList = idleCarListProvider.getByCondition(filteredCenterList, newBookDto);

        log.info("Filtered car schedules: {}", filteredScheduleList.size());
        log.info("Filtered car schedules: {}", filteredScheduleList);

        if (filteredScheduleList.isEmpty()) {
            throw new DispatchException("예약 조건에 맞는 유휴 차량이 없습니다.");
        }

        // duration, distance 정보
        // TODO: 동일한 센터에 대한 유휴시간인 경우 API 호출을 최소화하도록 구현 필요
        FinalNewPathDto bestPath = routeInfoProvider.getAll(filteredScheduleList, newBookDto).stream()
                .filter(finalNewPathValidator::isFirstPathDurationExceed)
                .filter(finalNewPathValidator::isScheduleWithinRentalWindow)
                .min(Comparator
                        .comparing(finalNewPathSelector::compareStartTimeDifference)
                        .thenComparing(FinalNewPathDto::totalDuration)
                        .thenComparing(FinalNewPathDto::totalDistance)
                )
                .orElseThrow(() -> new DispatchException("총 이동시간"));
        log.info("Best path found: {}", bestPath);
    }
}
