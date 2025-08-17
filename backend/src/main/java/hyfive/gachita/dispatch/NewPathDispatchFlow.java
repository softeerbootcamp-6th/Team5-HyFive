package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.CenterDto;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.CarScheduleDto;
import hyfive.gachita.dispatch.dto.NewPathDto;
import hyfive.gachita.dispatch.excepion.DispatchExpectedException;
import hyfive.gachita.dispatch.module.filter.BoundingBoxFilter;
import hyfive.gachita.dispatch.module.filter.CarSelector;
import hyfive.gachita.dispatch.module.filter.HaversineFilter;
import hyfive.gachita.dispatch.module.provider.CenterListProvider;
import hyfive.gachita.dispatch.module.provider.IdleCarListProvider;
import hyfive.gachita.dispatch.module.provider.RouteInfoProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class NewPathDispatchFlow {

    private final CenterListProvider centerListProvider;
    private final BoundingBoxFilter boundingBoxFilter;
    private final HaversineFilter haversineFilter;
    private final IdleCarListProvider idleCarListProvider;
    private final CarSelector carSelector;
    private final RouteInfoProvider routeInfoProvider;

    public void execute(NewBookDto newBookDto) {
        // TODO : test 메서드 구현
        // 센터 정보
        List<CenterDto> centerCandidates = centerListProvider.getAll().stream()
                .filter(center -> boundingBoxFilter.test(center, bboxCondition))
                .filter(center -> haversineFilter.test(center, radiusCondition))
                .toList();

        // car, rental 정보
        List<CarScheduleDto> carScheduleCandidates = idleCarListProvider.getByCondition(centerCandidates, newBookDto).stream()
                .collect(Collectors.groupingBy(CarScheduleDto::centerId)).values().stream()
                .flatMap(cars -> carSelector.selectBestCarForSingleCenter(cars).stream())
                .toList();

        // duration, distance 정보
        NewPathDto bestPath = routeInfoProvider.getAll(carScheduleCandidates, newBookDto).stream()
                .filter(p -> p.routeInfo().totalDuration() < 3600)
                .min(Comparator
                        .comparing((NewPathDto p) -> p.routeInfo().totalDuration())
                        .thenComparing(p -> p.routeInfo().totalDistance())
                )
                .orElseThrow(() -> new DispatchExpectedException("총 이동시간"));
    }
}
