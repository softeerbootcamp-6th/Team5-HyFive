package hyfive.gachita.test;

import hyfive.gachita.api.geocode.dto.LatLng;
import hyfive.gachita.api.kakao.KakaoNaviService;
import hyfive.gachita.common.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
@Slf4j
public class TestController {
    private final TestService testService;
    private final KakaoNaviService kakaoNaviService;

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
    public BaseResponse<Integer> kakaoNaviApiTest() {
        LatLng start = new LatLng(127.10764191124568,37.402464820205246);
        LatLng end = new LatLng(127.11056336672839,37.39419693653072);
        int seconds = kakaoNaviService.getTotalRouteTime(start, end);
        Long minutes = TimeUnit.SECONDS.toMinutes(seconds);
        log.info("이동시간 : {} 분", minutes);
        return BaseResponse.success(seconds);
    }
}
