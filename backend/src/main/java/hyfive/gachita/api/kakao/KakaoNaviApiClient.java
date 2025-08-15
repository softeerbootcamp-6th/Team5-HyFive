package hyfive.gachita.api.kakao;

import hyfive.gachita.api.ApiClient;
import hyfive.gachita.api.kakao.dto.request.DirectionsReq;
import hyfive.gachita.api.kakao.dto.response.KakaoNaviRes;
import hyfive.gachita.domain.common.response.BusinessException;
import hyfive.gachita.domain.common.response.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Map;

// 자동차 길찾기 API : 최대 5개의 경유지 추가 가능
@Component
@Slf4j
public class KakaoNaviApiClient extends ApiClient {

    private static final String DIRECTIONS_URI = "/directions";
    private static final String WAYPOINTS_URI = "/waypoints/directions";

    private final String apiKey;
    private final String baseUrl;

    public KakaoNaviApiClient(@Qualifier("KakaoNaviRestClient") RestClient restClient,
                                    @Value("${kakao.navi.api.key:defaultKey}") String apiKey,
                                    @Value("${kakao.navi.api.base-url:defaultUrl}") String baseUrl) {
        super(restClient);
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    public KakaoNaviRes.Route getDirections(DirectionsReq request) {
        URI uri = UriComponentsBuilder.fromUriString(baseUrl + DIRECTIONS_URI)
                .queryParam("origin", request.origin())
                .queryParam("destination", request.destination())
                .build()
                .toUri();

        Map<String, String> header = Map.of("Authorization", "KakaoAK " + apiKey);
        KakaoNaviRes result = get(uri, header, KakaoNaviRes.class);

        return getValidRoute(result);
    }

    public KakaoNaviRes.Route getWaypointsDirections(DirectionsReq request) {
        URI uri = UriComponentsBuilder.fromUriString(baseUrl + WAYPOINTS_URI).build().toUri();

        Map<String, String> header = Map.of("Authorization", "KakaoAK " + apiKey);

        KakaoNaviRes result = post(uri, header, request, KakaoNaviRes.class);
        return getValidRoute(result);
    }

    private static KakaoNaviRes.Route getValidRoute(KakaoNaviRes result) {
        KakaoNaviRes.Route route = result.routes().get(0);  // 첫 번째 추천 경로 기준
        if (route.resultCode() != NaviResultCode.SUCCSS.code) {
            throw new BusinessException(ErrorCode.EXTERNAL_API_ERROR);
        }
        return route;
    }
}
