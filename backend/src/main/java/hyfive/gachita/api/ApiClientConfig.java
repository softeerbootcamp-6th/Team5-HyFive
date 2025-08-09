package hyfive.gachita.api;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Configuration
@Slf4j
public class ApiClientConfig {
    @Bean
    @Qualifier("GeoCodeRestClient")
    public RestClient geoCodeRestClient() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(2000); // 연결 타임아웃 2초
        factory.setReadTimeout(2000);    // 응답 타임아웃 2초

        return RestClient.builder()
                .requestFactory(factory)
                .requestInterceptor(loggingInterceptor())
                .build();
    }

    private ClientHttpRequestInterceptor loggingInterceptor() {
        return (request, body, execution) -> {
            log.info("요청 URI: {}", request.getURI());
            var response = execution.execute(request, body);
            log.info("응답 메시지 : {}", response.getStatusCode());
            return response;
        };
    }
}
