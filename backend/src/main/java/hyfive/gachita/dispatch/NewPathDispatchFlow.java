package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.CarScheduleDto;
import hyfive.gachita.dispatch.dto.CenterDto;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.NewPathDto;
import hyfive.gachita.dispatch.excepion.DispatchException;
import hyfive.gachita.dispatch.module.condition.BoundingBoxCondition;
import hyfive.gachita.dispatch.module.condition.RadiusCondition;
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
    private final IdleCarListProvider idleCarListProvider;
    private final CarSelector carSelector;
    private final RouteInfoProvider routeInfoProvider;
    private final BoundingBoxFilter boundingBoxFilter;
    private final HaversineFilter haversineFilter;

    private final static int RADIUS_METERS = 500;

    // TODO: DTO 네이밍 컨벤션에 맞게 수정 FilteredCenterDto, NewPathCandidateDto, FinalNewPathDto
    public void execute(NewBookDto newBookDto) {
        // center 정보
        BoundingBoxCondition boundingBoxCondition = BoundingBoxCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);
        RadiusCondition radiusCondition = RadiusCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);
        List<CenterDto> centerCandidates = centerListProvider.getAll().stream()
                .filter(center -> boundingBoxFilter.test(center, boundingBoxCondition))
                .filter(center -> haversineFilter.test(center, radiusCondition))
                .toList();

        // car, rental 정보
        List<CarScheduleDto> carScheduleCandidates = idleCarListProvider.getByCondition(centerCandidates, newBookDto);

        // duration, distance 정보
        NewPathDto bestPath = routeInfoProvider.getAll(carScheduleCandidates, newBookDto).stream()
                .filter(p -> p.routeInfo().totalDuration() < 3600)
                // TODO: 센터 ~ 하차 시간이 모두 유휴시간에 포함되는지
                //  .filter()
                .min(Comparator
                        // TODO: 센터노드.time - rentalStartTime 이 가장 작은가
                        // TODO: rentalEndTime - 센터노드.time 이 가장 큰가
                        .comparing((NewPathDto p) -> p.routeInfo().totalDuration())
                        .thenComparing(p -> p.routeInfo().totalDistance())
                )
                .orElseThrow(() -> new DispatchException("총 이동시간"));
    }
}
