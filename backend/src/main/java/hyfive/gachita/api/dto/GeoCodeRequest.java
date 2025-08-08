package hyfive.gachita.api.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GeoCodeRequest {
    private String request;
    @Builder.Default private String type = "ROAD";
    private String address;
    private String point;
    @Builder.Default private String format = "json";
    @Builder.Default private String simple = "true";
}
