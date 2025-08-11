package hyfive.gachita.test;

import hyfive.gachita.api.kakao.KakaoNaviApiClient;
import hyfive.gachita.api.kakao.dto.request.DirectionsReq;
import hyfive.gachita.api.kakao.dto.response.KakaoNaviRes;
import hyfive.gachita.common.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {
    private final TestService testService;
    private final KakaoNaviApiClient kakaoNaviApiClient;

    @PostMapping
    public BaseResponse<Test> createTest(@RequestBody Test test) {
        return BaseResponse.success(testService.createTest(test));
    }

    @GetMapping
    public BaseResponse<List<Test>> getAllTests() {
        return BaseResponse.success(testService.getAllTests());
    }

    @GetMapping("/{id}")
    public BaseResponse<Test> getTestById(@PathVariable Long id) {
        return BaseResponse.success(testService.getTestById(id));
    }

    @PutMapping("/{id}")
    public BaseResponse<Test> updateTest(@PathVariable Long id, @RequestBody Test testDetails) {
        return BaseResponse.success(testService.updateTest(id, testDetails));
    }

    @DeleteMapping("/{id}")
    public BaseResponse<Void> deleteTest(@PathVariable Long id) {
        testService.deleteTest(id);
        return BaseResponse.success(null);
    }

    @GetMapping("/kakao")
    public BaseResponse<KakaoNaviRes> kakaoNaviApiTest() {
        String origin = "127.10764191124568,37.402464820205246";
        String destination = "127.11056336672839,37.39419693653072";
        DirectionsReq req = new DirectionsReq(origin, destination);
        KakaoNaviRes naviRes = kakaoNaviApiClient.getDirections(req);
        return BaseResponse.success(naviRes);
    }
}
