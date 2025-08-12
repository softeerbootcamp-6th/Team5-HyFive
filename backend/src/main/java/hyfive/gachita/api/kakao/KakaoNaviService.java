package hyfive.gachita.api.kakao;

import hyfive.gachita.api.geocode.dto.LatLng;
import hyfive.gachita.api.kakao.dto.Location;
import hyfive.gachita.api.kakao.dto.request.DirectionsReq;
import hyfive.gachita.api.kakao.dto.response.KakaoNaviRes;
import hyfive.gachita.common.response.BusinessException;
import hyfive.gachita.common.response.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
