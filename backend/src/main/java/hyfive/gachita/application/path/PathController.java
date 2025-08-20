package hyfive.gachita.application.path;

import hyfive.gachita.application.path.dto.PassengerRes;
import hyfive.gachita.global.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/path")
@RequiredArgsConstructor
public class PathController {
    private final PathService pathService;

    @GetMapping("/{pathId}/passenger")
    public BaseResponse<List<PassengerRes>> getPathPassengers(@PathVariable Long pathId) {
        return BaseResponse.success(pathService.getPathPassengers(pathId));
    }
}
