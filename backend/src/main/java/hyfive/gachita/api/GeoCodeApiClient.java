package hyfive.gachita.api;

import hyfive.gachita.api.dto.GeoCodeApiRes;
import hyfive.gachita.api.dto.GeoCodeReq;
import hyfive.gachita.api.dto.CoordResult;
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
                            @Value("${geocode.api.key}") String apiKey,
                            @Value("${geocode.api.base-url}") String baseUrl) {
        super(restClient);
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    public CoordResult callGeoCodeApi(GeoCodeReq request) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(baseUrl)
                .queryParam("key", apiKey)
                .queryParam("service", "address")
                .queryParam("request", request.request())
                .queryParam("type", request.type())
                .queryParam("format", request.format())
                .queryParam("simple", request.simple())
                .queryParam("point", request.point());
        URI uri = uriBuilder.build().toUri();
        log.info("Request GeoCode API. URI: {}", uri);

        GeoCodeApiRes<CoordResult> apiResponse = performApiCall(
                uri,
                new ParameterizedTypeReference<GeoCodeApiRes<CoordResult>>() {}
        );

        // ERROR 응답 수신
        GeoCodeApiRes.ResponseWrapper<CoordResult> responseWrapper = apiResponse.response();
        if ("ERROR".equalsIgnoreCase(responseWrapper.status())) {
            GeoCodeApiRes.ErrorDetails error = responseWrapper.error();
            log.error("GeoCode API business error. Code: {}, Message: {}", error.code(), error.text());
            throw new RuntimeException("API call fail " + error);
        }

        return responseWrapper.result();
    }
}
