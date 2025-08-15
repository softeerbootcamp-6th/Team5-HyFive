package hyfive.gachita.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RestClient;

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
            log.info("요청 URI: {}", request.getURI());
            ClientHttpResponse response = execution.execute(request, body);
            log.info("응답 상태 코드 : {}", response.getStatusCode());
            return response;
        };
    }
}
