package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.client.geocode.dto.LatLng;
import hyfive.gachita.client.kakao.KakaoNaviService;
import hyfive.gachita.client.kakao.RouteInfo;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.CarScheduleDto;
import hyfive.gachita.dispatch.dto.FinalNewPathDto;
import hyfive.gachita.dispatch.dto.NewPathNodeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class RouteInfoProvider {
    private final KakaoNaviService kakaoNaviService;

    public List<FinalNewPathDto> getAll(List<CarScheduleDto> candidates, NewBookDto newBookDto) {
        return candidates.stream()
                .map(candidate -> {
                    List<LatLng> nodeList = List.of(
                            new LatLng(newBookDto.startLat(), newBookDto.startLng()),
                            new LatLng(candidate.centerDto().lat(), candidate.centerDto().lat()),
                            new LatLng(newBookDto.endLat(), newBookDto.endLng())
                    );
                    RouteInfo routeInfo = kakaoNaviService.geRouteInfo(nodeList);

                    // 경로 정보에 따라 노드 정보 추가 (센터, 탑승지, 하차지)의 시간 계산
                    List<NewPathNodeDto> nodeDtoList = new ArrayList<>();

                    LocalTime endTime = newBookDto.deadline().getFirst();
                    LocalTime startTime = endTime.minusSeconds(routeInfo.durationList().get(1));
                    LocalTime centerTime = startTime.minusSeconds(routeInfo.durationList().get(0));

                    nodeDtoList.add(NewPathNodeDto.createStartNode(
                            newBookDto.startLat(), newBookDto.startLng(), startTime));
                    nodeDtoList.add(NewPathNodeDto.createEndNode(
                            newBookDto.endLat(), newBookDto.endLng(), endTime));
                    nodeDtoList.add(NewPathNodeDto.createCenterNode(
                            candidate.centerDto().lat(), candidate.centerDto().lng(), centerTime));

                    return FinalNewPathDto.builder()
                            .totalDuration(routeInfo.totalDuration())
                            .totalDistance(routeInfo.totalDistance())
                            .path(candidate)
                            .nodeList(nodeDtoList)
                            .build();
                })
                .toList();
    }
}
