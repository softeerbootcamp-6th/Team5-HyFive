package hyfive.gachita.test;

import hyfive.gachita.common.response.BaseResponse;
import hyfive.gachita.common.response.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {
    private final TestService testService;

    @PostMapping
    public BaseResponse<Test> createTest(@RequestBody Test test) {
        BaseResponse<Test> result = BaseResponse.success(testService.createTest(test));
        return result;
    }

    @GetMapping
    public BaseResponse<List<Test>> getAllTests() {
        return BaseResponse.success(testService.getAllTests());
    }

    @GetMapping("/{id}")
    public BaseResponse<Test> getTestById(@PathVariable Long id) {
        Test test = testService.getTestById(id);
        if (test != null) {
            return BaseResponse.success(test);
        }
        return BaseResponse.fail(ErrorCode.NO_EXIST_VALUE);
    }

    @PutMapping("/{id}")
    public BaseResponse<Test> updateTest(@PathVariable Long id, @RequestBody Test testDetails) {
        Test updatedTest = testService.updateTest(id, testDetails);
        if (updatedTest != null) {
            return BaseResponse.success(updatedTest);
        }
        return BaseResponse.fail(ErrorCode.NO_EXIST_VALUE);
    }

    @DeleteMapping("/{id}")
    public BaseResponse<Void> deleteTest(@PathVariable Long id) {
        testService.deleteTest(id);
        return BaseResponse.success(null);
    }
}
