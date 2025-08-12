package hyfive.gachita.api.kakao;

import hyfive.gachita.api.ApiClient;
import hyfive.gachita.api.kakao.dto.request.DirectionsReq;
import hyfive.gachita.api.kakao.dto.response.KakaoNaviRes;
import hyfive.gachita.common.response.BusinessException;
import hyfive.gachita.common.response.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

// 다중 경유지 길찾기 API : 최대 30개의 경유지 추가 가능
@Component
@Slf4j
public class KakaoWaypointsApiClient extends ApiClient {

    private static final String WAYPOINTS_URI = "/waypoints/directions";

    private final String apiKey;
    private final String baseUrl;

    public KakaoWaypointsApiClient(@Qualifier("KakaoNaviRestClient") RestClient restClient,
                                   @Value("${kakao.navi.api.key}") String apiKey,
                                   @Value("${kakao.navi.api.base-url}") String baseUrl) {
        super(restClient);
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    public KakaoNaviRes.Route getWaypointsDirections(DirectionsReq request) {
        URI uri = UriComponentsBuilder.fromUriString(baseUrl + WAYPOINTS_URI).build().toUri();

        KakaoNaviRes result =  restClient.post()
                .uri(uri)
                .header("Authorization", "KakaoAK " + apiKey)
                .body(request)
                .retrieve()
                .body(KakaoNaviRes.class);

        KakaoNaviRes.Route route = result.routes().get(0);  // 첫 번째 추천 경로 기준
        if (route.resultCode() != NaviResultCode.SUCCSS.code) {
            throw new BusinessException(ErrorCode.EXTERNAL_API_ERROR);
        }
        return route;
    }
}
