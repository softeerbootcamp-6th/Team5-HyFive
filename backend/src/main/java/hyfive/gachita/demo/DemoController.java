package hyfive.gachita.demo;

import hyfive.gachita.application.path.DriveStatus;
import hyfive.gachita.global.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/demo")
@RequiredArgsConstructor
public class DemoController {
    private final DemoService demoService;

    @GetMapping("/path/{pathId}/save-polyline")
    @Operation(
            summary = "특정 Path의 Polyline 저장",
            description = "pathId를 받아 해당 경로의 polyline 정보를 DB에 저장합니다."
    )
    public BaseResponse<String> savePathPolyLine(@PathVariable Long pathId) {
        demoService.savePolyline(pathId);
        return BaseResponse.success("Polyline saved successfully");
    }

    @GetMapping("/path/today/save-polyline")
    @Operation(
            summary = "운행 날짜가 오늘인 Path Polyline 저장",
            description = "운행 날짜가 오늘인 모든 Path의 polyline 정보를 DB에 저장하고 결과를 반환합니다."
    )
    public BaseResponse<Map<String, Object>> savePathPolyLine() {
        return BaseResponse.success(demoService.saveTodayPathPolyline());
    }

    @PatchMapping("/path/drive-status")
    @Operation(
            summary = "경로 운행 상태 변경",
            description = "경로 ID와 새로운 운행 상태를 받아 해당 경로의 운행 상태를 변경하고 결과를 반환합니다."
    )
    public BaseResponse<Map<String, Object>> changeDriveStatus(Long id, DriveStatus status) {
        return BaseResponse.success(demoService.changeDriveStatus(id, status));
    }
}
