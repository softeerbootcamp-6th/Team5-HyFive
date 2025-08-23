package hyfive.gachita.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RestClient;

import java.nio.charset.StandardCharsets;

@Configuration
@Slf4j
public class ApiClientConfig {
    @Bean
    @Qualifier("GeoCodeRestClient")
    public RestClient geoCodeRestClient() {
        return RestClient.builder()
                .requestInterceptor(loggingInterceptor())
                .build();
    }

    @Bean
    @Qualifier("KakaoNaviRestClient")
    public RestClient kaKaoNaviRestClient() {
        return RestClient.builder()
                .requestInterceptor(loggingInterceptor())
                .build();
    }

    private ClientHttpRequestInterceptor loggingInterceptor() {
        return (request, body, execution) -> {
            log.debug("요청 URI: {}", request.getURI());
            log.debug("요청 Body: {}", new String(body, StandardCharsets.UTF_8));
            ClientHttpResponse response = execution.execute(request, body);
            log.debug("응답 상태 코드 : {}", response.getStatusCode());
            return response;
        };
    }
}
