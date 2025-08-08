package hyfive.gachita.api;

import hyfive.gachita.api.dto.GeoCodeRequest;
import hyfive.gachita.api.dto.GeoCodeResult;
import hyfive.gachita.api.dto.VWorldApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@Slf4j
public class VWorldApiClient {

    private final WebClient webClient;
    private final String apiKey;

    public VWorldApiClient(@Value("${vworld.api.base-url}") String baseUrl,
                           @Value("${vworld.api.key}") String apiKey) {
        this.apiKey = apiKey;
        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

    public VWorldApiResponse<GeoCodeResult> callGeoCodeApi(GeoCodeRequest request) {
        return webClient.get()
                .uri(uriBuilder -> {
                    uriBuilder.queryParam("key", apiKey)
                            .queryParam("request", request.getRequest())
                            .queryParam("type", request.getType())
                            .queryParam("format", request.getFormat())
                            .queryParam("simple", request.getSimple());

                    if ("getCoord".equalsIgnoreCase(request.getRequest())) {
                        uriBuilder.queryParam("address", request.getAddress());
                    } else if ("getAddress".equalsIgnoreCase(request.getRequest())) {
                        uriBuilder.queryParam("point", request.getPoint());
                    }
                    String uri = uriBuilder.toUriString();
                    log.info("URI: " + uri);
                    return uriBuilder.build();
                })
                .retrieve()
                .onStatus(HttpStatusCode::isError, clientResponse ->
                        clientResponse.bodyToMono(String.class)
                                .map(error -> new RuntimeException("API Error: " + error))
                )
                .bodyToMono(new ParameterizedTypeReference<VWorldApiResponse<GeoCodeResult>>() {})
                .block();
    }
}
