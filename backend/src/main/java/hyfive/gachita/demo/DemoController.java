package hyfive.gachita.demo;

import hyfive.gachita.application.path.PathService;
import hyfive.gachita.global.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/demo")
@RequiredArgsConstructor
public class DemoController {
    private final PathService pathService;

    @RequestMapping("/path/{pathId}/save-polyline")
    public BaseResponse<String> savePathPolyLine(@PathVariable Long pathId) {
        pathService.savePolyline(pathId);
        return BaseResponse.success("Polyline saved successfully");
    }

    @RequestMapping("/path/today/save-polyline")
    public BaseResponse<String> savePathPolyLine() {
        pathService.saveTodayPathPolyline();
        return BaseResponse.success("Polyline saved successfully");
    }
}
