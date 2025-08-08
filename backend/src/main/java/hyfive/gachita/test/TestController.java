package hyfive.gachita.test;

import hyfive.gachita.api.dto.GeoCodeRequest;
import hyfive.gachita.api.dto.GeoCodeResult;
import hyfive.gachita.api.GeoCodeService;
import hyfive.gachita.api.dto.VWorldApiResponse;
import hyfive.gachita.common.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {
    private final TestService testService;
    private final GeoCodeService GeoCodeService;

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

    @GetMapping("/api")
    public VWorldApiResponse<GeoCodeResult> apiTest() {
        return GeoCodeService.callGeoCodeApi(GeoCodeRequest.builder()
                        .request("getCoord")
                        .address("서울시 노원구 공릉로 129 (공릉동)")
                .build());
    }

}
