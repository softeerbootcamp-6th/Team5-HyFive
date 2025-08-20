package hyfive.gachita.application.path;

import hyfive.gachita.application.path.dto.MapDrawRes;
import hyfive.gachita.global.BaseResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/path")
@RequiredArgsConstructor
@Validated
public class PathController {
    private final PathService pathService;

    @GetMapping("/{id}/nodes")
    public BaseResponse<MapDrawRes> getMapDraw(@PathVariable("id") @NotNull Long id){
        return BaseResponse.success(pathService.getMapDraw(id));
    }
}
