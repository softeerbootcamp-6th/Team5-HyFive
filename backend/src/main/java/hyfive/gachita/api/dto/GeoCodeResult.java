package hyfive.gachita.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GeoCodeResult {
    private String x;
    private String y;
//    private String address; // 혹은 필요한 필드들
}
