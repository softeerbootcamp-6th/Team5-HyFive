package hyfive.gachita.common.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    final static String TITLE = "Gachita Api Docs";
    final static String VERSION = "1.0.0";
    final static String DESCRIPTION = "소프티어 6기 Team5-HyFive api 명세서 입니다";

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .title(TITLE)
                .version(VERSION)
                .description(DESCRIPTION);
    }
}
