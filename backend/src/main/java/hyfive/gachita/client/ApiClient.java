package hyfive.gachita.client;

import hyfive.gachita.global.BusinessException;
import hyfive.gachita.global.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RestClient;

import java.io.IOException;
import java.net.URI;
import java.util.Map;

@Slf4j
public abstract class ApiClient {

    protected final RestClient restClient;

    protected ApiClient(RestClient restClient) {
        this.restClient = restClient;
    }

    protected <T> T get(URI uri, ParameterizedTypeReference<T> responseType) {
        return restClient.get().uri(uri)
                .retrieve()
                .onStatus(HttpStatusCode::isError, this::handleApiError)
                .body(responseType);
    }

    protected <T> T get(URI uri, Map<String, String> headers, Class<T> responseType) {
        return createRequest(headers, restClient.get().uri(uri))
                .retrieve()
                .onStatus(HttpStatusCode::isError, this::handleApiError)
                .body(responseType);
    }

    protected <T> T post(URI uri, Map<String, String> headers, Object body, Class<T> responseType) {
        return createRequest(headers, restClient.post().uri(uri))
                .body(body)
                .retrieve()
                .onStatus(HttpStatusCode::isError, this::handleApiError)
                .body(responseType);
    }

    private <S extends RestClient.RequestHeadersSpec<?>> S createRequest(Map<String, String> headers, S spec) {
        if (headers != null && !headers.isEmpty()) {
            headers.forEach(spec::header);
        }
        return spec;
    }

    private void handleApiError(HttpRequest request, ClientHttpResponse response) throws IOException {
        String errorBody = new String(response.getBody().readAllBytes());
        log.error("API HTTP Error. Status: {}, URI: {}, Body: {}",
        response.getStatusCode(), request.getURI(), errorBody);
        throw new BusinessException(ErrorCode.EXTERNAL_API_ERROR, errorBody);
    }
}
