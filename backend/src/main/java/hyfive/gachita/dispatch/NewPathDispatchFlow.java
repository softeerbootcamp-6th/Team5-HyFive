package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.CarScheduleDto;
import hyfive.gachita.dispatch.dto.FilteredCenterDto;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.FinalNewPathDto;
import hyfive.gachita.dispatch.excepion.DispatchException;
import hyfive.gachita.dispatch.module.condition.BoundingBoxCondition;
import hyfive.gachita.dispatch.module.condition.RadiusCondition;
import hyfive.gachita.dispatch.module.filter.BoundingBoxFilter;
import hyfive.gachita.dispatch.module.filter.HaversineFilter;
import hyfive.gachita.dispatch.module.provider.CenterListProvider;
import hyfive.gachita.dispatch.module.provider.IdleCarListProvider;
import hyfive.gachita.dispatch.module.provider.RouteInfoProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
public class NewPathDispatchFlow {
    private final CenterListProvider centerListProvider;
    private final IdleCarListProvider idleCarListProvider;
    private final RouteInfoProvider routeInfoProvider;
    private final BoundingBoxFilter boundingBoxFilter;
    private final HaversineFilter haversineFilter;

    private final static int RADIUS_METERS = 500;

    public void execute(NewBookDto newBookDto) {
        // center 정보
        BoundingBoxCondition boundingBoxCondition = BoundingBoxCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);
        RadiusCondition radiusCondition = RadiusCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);

        List<FilteredCenterDto> filteredCenterList = centerListProvider.getAll().stream()
                .filter(center -> boundingBoxFilter.test(center, boundingBoxCondition))
                .filter(center -> haversineFilter.test(center, radiusCondition))
                .toList();

        // car, rental 정보
        List<CarScheduleDto> filteredScheduleList = idleCarListProvider.getByCondition(filteredCenterList, newBookDto);

        // duration, distance 정보
        // TODO: 모듈로 분리
        FinalNewPathDto bestPath = routeInfoProvider.getAll(filteredScheduleList, newBookDto).stream()
                .filter(p -> p.totalDuration() < 3600)
                // 센터 ~ 하차 시간이 모두 유휴시간에 포함되는지
                .filter(p -> {
                    LocalTime startTime = p.nodeList().get(0).time();
                    LocalTime endTime = p.nodeList().get(p.nodeList().size() - 1).time();
                    LocalTime rentalStartTime = p.path().rentalStartTime();
                    LocalTime rentalEndTime = p.path().rentalEndTime();
                    return rentalStartTime.isBefore(startTime) && endTime.isBefore(rentalEndTime);
                })
                .min(Comparator
                        // 차량 출발 시각과 유휴 시작 시간의 차이를 최소화
                        .comparing((FinalNewPathDto p) -> {
                            LocalTime startTime = p.nodeList().get(0).time();
                            LocalTime rentalStartTime = p.path().rentalStartTime();
                            return startTime.toSecondOfDay() - rentalStartTime.toSecondOfDay();
                        })
                        .thenComparing(FinalNewPathDto::totalDuration)
                        .thenComparing(FinalNewPathDto::totalDistance)
                )
                .orElseThrow(() -> new DispatchException("총 이동시간"));
    }
}
