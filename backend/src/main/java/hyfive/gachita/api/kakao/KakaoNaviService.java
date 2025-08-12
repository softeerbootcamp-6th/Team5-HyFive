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

    public long getTotalRouteTime(LatLng start, LatLng end) {
        DirectionsReq request = DirectionsReq.builder()
                .origin(Location.fromLatLng(start))
                .destination(Location.fromLatLng(end))
                .waypoints(List.of())
                .build();
        KakaoNaviRes result = kakaoNaviApiClient.getWaypointsDirections(request);

        long totalTime = 0L;
        List<KakaoNaviRes.Route> routeList = result.routes();
        for (KakaoNaviRes.Route route : routeList) {
            if (route.resultCode() != NaviResultCode.SUCCSS.code) {
                throw new BusinessException(ErrorCode.EXTERNAL_API_ERROR);
            }
            totalTime += route.summary().duration();
        }
        return totalTime;
    }

    public List<List<LatLng>> getTotalRouteTime(List<LatLng> nodeList) {
        LatLng start = nodeList.get(0);
        LatLng end = nodeList.get(nodeList.size() - 1);
        List<Location> waypoints = nodeList.subList(1, nodeList.size() - 1).stream()
                .map(Location::fromLatLng)
                .toList();

        DirectionsReq request = DirectionsReq.builder()
                .origin(Location.fromLatLng(start))
                .destination(Location.fromLatLng(end))
                .waypoints(waypoints)
                .build();
        KakaoNaviRes result = kakaoNaviApiClient.getWaypointsDirections(request);

        long totalTime = 0L;
        List<List<LatLng>> polylineList = new ArrayList<>();

        List<KakaoNaviRes.Route> routeList = result.routes();
        for (KakaoNaviRes.Route route : routeList) {
            if (route.resultCode() != NaviResultCode.SUCCSS.code) {
                throw new BusinessException(ErrorCode.EXTERNAL_API_ERROR);
            }
            for (KakaoNaviRes.Section section : route.sections()) {
                List<LatLng> points = new ArrayList<>();
                for (KakaoNaviRes.Road road : section.roads()) {
                    List<Double> vertexes = road.vertexes();
                    for (int i = 0; i < vertexes.size(); i += 2) {
                        double x = vertexes.get(i);
                        double y = vertexes.get(i + 1);
                        points.add(new LatLng(x, y));
                    }
                }
                polylineList.add(points);
            }

            totalTime += route.summary().duration();
        }
        return polylineList;
    }
}
