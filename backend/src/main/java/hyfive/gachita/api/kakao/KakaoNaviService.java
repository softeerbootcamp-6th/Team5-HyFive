package hyfive.gachita.api.kakao;

import hyfive.gachita.api.geocode.dto.LatLng;
import hyfive.gachita.api.kakao.dto.Location;
import hyfive.gachita.api.kakao.dto.request.DirectionsReq;
import hyfive.gachita.api.kakao.dto.response.KakaoNaviRes;
import hyfive.gachita.common.response.BusinessException;
import hyfive.gachita.common.response.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KakaoNaviService {
    private final KakaoNaviApiClient kakaoNaviApiClient;

    public RouteInfo geRouteInfo(List<LatLng> nodeList) {
        DirectionsReq request = createDirectionsReq(nodeList);

        // API 호출
        KakaoNaviRes result = kakaoNaviApiClient.getWaypointsDirections(request);

        KakaoNaviRes.Route route = result.routes().get(0);  // 첫 번째 추천 경로 기준
        if (route.resultCode() != NaviResultCode.SUCCSS.code) {
            throw new BusinessException(ErrorCode.EXTERNAL_API_ERROR);
        }

        int totalTime = route.summary().duration();

        List<List<LatLng>> polylineList = new ArrayList<>();

        // 각 지점 사이의 경로 순회
        for (KakaoNaviRes.Section section : route.sections()) {
            List<LatLng> pointList = extractedSectionPoint(section);
            polylineList.add(pointList);
        }
        return RouteInfo.builder()
                .totalTime(totalTime)
                .polylineList(polylineList)
                .build();
    }

    // 경로를 구성하는 좌표를 하나의 리스트로 통합
    private List<LatLng> extractedSectionPoint(KakaoNaviRes.Section section) {
        List<LatLng> pointList = new ArrayList<>();
        for (KakaoNaviRes.Road road : section.roads()) {
            List<Double> vertexes = road.vertexes();
            for (int i = 0; i < vertexes.size(); i += 2) {
                pointList.add(new LatLng(vertexes.get(i), vertexes.get(i + 1)));
            }
        }
        return pointList;
    }

    private DirectionsReq createDirectionsReq(List<LatLng> nodeList) {
        LatLng start = nodeList.get(0);
        LatLng end = nodeList.get(nodeList.size() - 1);
        List<Location> waypoints = nodeList.subList(1, nodeList.size() - 1).stream()
                .map(Location::fromLatLng)
                .toList();

        return DirectionsReq.builder()
                .origin(Location.fromLatLng(start))
                .destination(Location.fromLatLng(end))
                .waypoints(waypoints)
                .build();
    }
}
