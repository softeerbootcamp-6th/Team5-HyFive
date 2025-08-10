package hyfive.gachita.center;

import hyfive.gachita.common.response.BaseResponse;
import hyfive.gachita.docs.CenterDocs;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/center")
@RequiredArgsConstructor
public class CenterController implements CenterDocs {
    private final CenterService centerService;

    @GetMapping("/{id}")
    public BaseResponse<CenterRes> getCenter(@PathVariable("id") @NotNull Long id) {
        CenterRes centerRes = centerService.getCenter(id);
        return BaseResponse.success(centerRes);
    }
}
