package hyfive.gachita.api.kakao;

import hyfive.gachita.api.geocode.dto.LatLng;
import hyfive.gachita.api.kakao.dto.request.DirectionsReq;
import hyfive.gachita.api.kakao.dto.response.KakaoNaviRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KakaoNaviService {
    private final KakaoNaviApiClient kakaoNaviApiClient;

    public int getTotalRouteTime(LatLng start, LatLng end) {
        DirectionsReq request = DirectionsReq.of(start.toString(), end.toString());
        KakaoNaviRes result = kakaoNaviApiClient.getDirections(request);
        int duration = result.routes().get(0).summary().duration();
        return duration;
    }
}
