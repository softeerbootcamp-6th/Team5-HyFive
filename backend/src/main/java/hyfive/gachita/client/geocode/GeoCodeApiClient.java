package hyfive.gachita.client.geocode;

import hyfive.gachita.client.ApiClient;
import hyfive.gachita.client.geocode.dto.GeoCodeApiRes;
import hyfive.gachita.client.geocode.dto.GeoCodeReq;
import hyfive.gachita.client.geocode.dto.CoordResult;
import hyfive.gachita.global.BusinessException;
import hyfive.gachita.global.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Component
@Slf4j
public class GeoCodeApiClient extends ApiClient {

    private final String apiKey;
    private final String baseUrl;

    public GeoCodeApiClient(@Qualifier("GeoCodeRestClient") RestClient restClient,
                            @Value("${geocode.api.key:defaultKey}") String apiKey,
                            @Value("${geocode.api.base-url:defaultUrl}") String baseUrl) {
        super(restClient);
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    public CoordResult callGeoCodeApi(GeoCodeReq request) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(baseUrl)
                .queryParam("key", apiKey)
                .queryParam("service", "address")
                .queryParam("type", "ROAD")
                .queryParam("format", "json")
                .queryParam("errorFormat", "json")
                .queryParam("simple", true)
                .queryParam("request", request.request())   // getCoord, getAddress
                .queryParam("address", request.address())   // 주소 -> 좌표 변환에만 값 설정
                .queryParam("point", request.point());      // 좌표 -> 주소 변환에만 값 설정
        URI uri = uriBuilder.build().toUri();

        GeoCodeApiRes<CoordResult> result = get(
                uri,
                new ParameterizedTypeReference<GeoCodeApiRes<CoordResult>>() {}
        );

        // ERROR 응답 수신
        GeoCodeApiRes.ResponseWrapper<CoordResult> responseWrapper = result.response();
        if ("NOT_FOUND".equalsIgnoreCase(responseWrapper.status())) {
            throw new BusinessException(ErrorCode.INVALID_INPUT,
                    String.format("좌표를 찾을 수 없는 주소입니다: %s", request.address()));
        }
        if ("ERROR".equalsIgnoreCase(responseWrapper.status())) {
            throw new BusinessException(ErrorCode.EXTERNAL_API_ERROR);
        }
        return responseWrapper.result();
    }
}
