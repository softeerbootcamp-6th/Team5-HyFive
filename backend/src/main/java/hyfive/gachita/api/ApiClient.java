package hyfive.gachita.api;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.client.RestClient;

import java.net.URI;

@Slf4j
public abstract class ApiClient {

    protected final RestClient restClient;

    protected ApiClient(RestClient restClient) {
        this.restClient = restClient;
    }
    protected <T> T performApiCall(URI uri, ParameterizedTypeReference<T> responseType) {
        return restClient.get()
                .uri(uri)
                .retrieve()
                // API 호출 자체가 실패하는 경우
                .onStatus(HttpStatusCode::isError, (request, response) -> {
                    String errorBody = new String(response.getBody().readAllBytes());
                    log.error("API HTTP Error. Status: {}, URI: {}, Body: {}",
                            response.getStatusCode(), request.getURI(), errorBody);
                    throw new RuntimeException("API call failed with HTTP status " + response.getStatusCode());
                })
                .body(responseType);
    }
}
