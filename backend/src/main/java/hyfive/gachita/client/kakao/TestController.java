package hyfive.gachita.client.kakao;

import hyfive.gachita.client.geocode.dto.LatLng;
import hyfive.gachita.global.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {
    private final KakaoNaviService kakaoNaviService;

    @GetMapping("/kakao")
    public BaseResponse<RouteInfo> kakaoNaviApiListTest() {
        LatLng hakdong = new LatLng(127.03167,37.51417);
        LatLng nonhyeon = new LatLng(127.02139,37.51111);
        LatLng sinsa = new LatLng(127.01950,37.51615);
        LatLng gangnam = new LatLng(127.0275833, 37.4979278);

        List<LatLng> nodes = List.of(hakdong, nonhyeon, sinsa, gangnam);
        return BaseResponse.success(kakaoNaviService.geRouteInfo(nodes));
    }
}
