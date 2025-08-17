package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.InitPathDto;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.NewPathDto;
import hyfive.gachita.dispatch.dto.PathWithRouteInfo;
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

    // TODO : DTO 네이밍 수정
    public void execute(NewBookDto newBookDto) {
        List<InitPathDto> centerCandidates = centerListProvider.getAll();

        // TODO : test 메서드 구현
        // 센터 정보
        List<InitPathDto> filteredCenterList = centerCandidates.stream()
                .filter(center -> boundingBoxFilter.test(center, bboxCondition))
                .filter(center -> haversineFilter.test(center, radiusCondition))
                .toList();

        // car, rental 정보
        List<NewPathDto> newPathCandidates = idleCarListProvider.getByCondition(filteredCenterList, newBookDto).stream()
                .collect(Collectors.groupingBy(NewPathDto::centerId)).values().stream()
                .flatMap(cars -> carSelector.selectBestCarForSingleCenter(cars).stream())
                .toList();

        // duration, distance 정보
        PathWithRouteInfo bestPath = routeInfoProvider.getAll(newPathCandidates, newBookDto).stream()
                .filter(p -> p.routeInfo().totalDuration() < 3600)
                .min(Comparator
                        .comparing((PathWithRouteInfo p) -> p.routeInfo().totalDuration())
                        .thenComparing(p -> p.routeInfo().totalDistance())
                )
                .orElseThrow(() -> new DispatchExpectedException("총 이동시간"));
    }
}
