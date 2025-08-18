package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.client.geocode.dto.LatLng;
import hyfive.gachita.client.kakao.KakaoNaviService;
import hyfive.gachita.client.kakao.RouteInfo;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.CarScheduleDto;
import hyfive.gachita.dispatch.dto.NewPathDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RouteInfoProvider {
    private final KakaoNaviService kakaoNaviService;

    public List<NewPathDto> getAll(List<CarScheduleDto> candidates, NewBookDto newBookDto) {
        return candidates.stream()
                .map(candidate -> {
                    List<LatLng> nodeList = List.of(
                            new LatLng(newBookDto.startLat(), newBookDto.startLng()),
                            new LatLng(candidate.centerLat(), candidate.centerLng()),
                            new LatLng(newBookDto.endLat(), newBookDto.endLng())
                    );
                    RouteInfo routeInfo = kakaoNaviService.geRouteInfo(nodeList);
                    return new NewPathDto(candidate, routeInfo);
                })
                .toList();
    }
}
