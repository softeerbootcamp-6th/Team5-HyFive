package hyfive.gachita.api;

import hyfive.gachita.api.dto.GeoCodeRequest;
import hyfive.gachita.api.dto.GeoCodeResult;
import hyfive.gachita.api.dto.VWorldApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
@Slf4j
public class VWorldApiClient {

    private final RestClient restClient;
    private final String apiKey;

    public VWorldApiClient(@Value("${vworld.api.base-url}") String baseUrl,
                           @Value("${vworld.api.key}") String apiKey) {
        this.apiKey = apiKey;
        this.restClient = RestClient.create(baseUrl);
    }

    public VWorldApiResponse<GeoCodeResult> callGeoCodeApi(GeoCodeRequest request) {
        return restClient.get()
                .uri(uriBuilder -> {
                    uriBuilder.queryParam("key", apiKey)
                            .queryParam("request", request.getRequest())
                            .queryParam("type", request.getType())
                            .queryParam("format", request.getFormat())
                            .queryParam("simple", request.getSimple())
                            // TODO: getAddress 서비스 (좌표 -> 주소)도 사용 가능하도록 반영
                            .queryParam("address", request.getAddress()); // getCoord (주소 -> 좌표)
//                            .queryParam("point", request.getPoint()); // getAddress (좌표 -> 주소)

                    String uriString = uriBuilder.build().toString();
                    log.info("Request URI: {}", uriString);
                    return uriBuilder.build();
                })
                .retrieve()
                .onStatus(HttpStatusCode::isError, (req, res) -> {
                    String errorBody = new String(res.getBody().readAllBytes());
                    throw new RuntimeException("API Error: " + errorBody);
                })
                .body(new ParameterizedTypeReference<VWorldApiResponse<GeoCodeResult>>() {});
    }
}
