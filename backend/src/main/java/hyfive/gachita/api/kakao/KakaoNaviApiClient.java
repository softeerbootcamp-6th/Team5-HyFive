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

@Component
@Slf4j
public class KakaoNaviApiClient extends ApiClient {

    private final String apiKey;
    private final String baseUrl;

    private static final String DIRECTIONS_URI = "/directions";

    // TODO: 다중 경유지 길찾기 API 추가
//    private static final String WAYPOINTS_URI = "/waypoints/directions";

    public KakaoNaviApiClient(@Qualifier("KakaoNaviRestClient") RestClient restClient,
                              @Value("${kakao.navi.api.key}") String apiKey,
                              @Value("${kakao.navi.api.base-url}") String baseUrl) {
        super(restClient);
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    // 자동차 길찾기 API
    public KakaoNaviRes getDirections(DirectionsReq request) {
        URI uri = UriComponentsBuilder.fromUriString(baseUrl + DIRECTIONS_URI)
                .queryParam("origin", request.origin())
                .queryParam("destination", request.destination())
                .build()
                .toUri();

        RestClient.RequestHeadersSpec<?> requestSpec = restClient.get().uri(uri);
        return callKakaoApi(requestSpec);
    }

    private KakaoNaviRes callKakaoApi(RestClient.RequestHeadersSpec<?> requestSpec) {
        return requestSpec
                .header("Authorization", "KakaoAK " + apiKey)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, res) -> {
                    log.error("Kakao Navi API error. Status: {}, Body: {}", res.getStatusCode(), res.getBody());
                    throw new BusinessException(ErrorCode.EXTERNAL_API_ERROR, "카카오 API 호출 중 오류가 발생했습니다.");
                })
                .body(KakaoNaviRes.class);
    }
}