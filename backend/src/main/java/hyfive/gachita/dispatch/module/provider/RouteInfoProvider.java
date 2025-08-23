package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.client.geocode.dto.LatLng;
import hyfive.gachita.client.kakao.KakaoNaviService;
import hyfive.gachita.client.kakao.RouteInfo;
import hyfive.gachita.dispatch.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@Component
@RequiredArgsConstructor
@Slf4j
public class RouteInfoProvider {
    private final KakaoNaviService kakaoNaviService;

    // API 호출 횟수 카운터
    private final AtomicInteger apiCallCounter = new AtomicInteger(0);

    public List<FinalNewPathDto> getAll(Map<FilteredCenterDto, List<CarScheduleDto>> scheduleListByCenter, NewBookDto newBookDto) {
        return scheduleListByCenter.entrySet().stream()
                .flatMap(entry -> {
                    FilteredCenterDto center = entry.getKey();
                    List<CarScheduleDto> schedules = entry.getValue();

                    List<LatLng> nodeList = List.of(
                            new LatLng(newBookDto.startLat(), newBookDto.startLng()),
                            new LatLng(center.lat(), center.lng()),
                            new LatLng(newBookDto.endLat(), newBookDto.endLng())
                    );

                    apiCallCounter.incrementAndGet();
                    RouteInfo routeInfo = kakaoNaviService.geRouteInfo(nodeList);

                    LocalTime endTime = newBookDto.deadline().getFirst();
                    LocalTime startTime = endTime.minusSeconds(routeInfo.durationList().get(1));
                    LocalTime centerTime = startTime.minusSeconds(routeInfo.durationList().get(0));

                    List<NewPathNodeDto> nodeDtoList = List.of(
                            NewPathNodeDto.createCenterNode(center.lat(), center.lng(), centerTime),
                            NewPathNodeDto.createStartNode(newBookDto.startLat(), newBookDto.startLng(), startTime),
                            NewPathNodeDto.createEndNode(newBookDto.endLat(), newBookDto.endLng(), endTime)
                    );

                    // FinalNewPathDto 생성
                    return schedules.stream()
                            .map(schedule -> FinalNewPathDto.from(
                                    schedule,
                                    routeInfo.totalDuration(),
                                    routeInfo.totalDistance(),
                                    nodeDtoList
                            ));
                })
                .toList();
    }

    public int getApiCallCount() {
        return apiCallCounter.get();
    }
}