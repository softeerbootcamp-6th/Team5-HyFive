package hyfive.gachita.center;

import hyfive.gachita.center.dto.CenterListRes;
import hyfive.gachita.center.dto.CenterRes;
import hyfive.gachita.common.dto.PagedListRes;
import hyfive.gachita.common.response.BaseResponse;
import hyfive.gachita.docs.CenterDocs;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/list")
    public BaseResponse<PagedListRes<CenterListRes>> getCenterList(
            @RequestParam(name = "page", required = false, defaultValue = "1") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "8") int limit
    ) {
        return BaseResponse.success(centerService.getCenterList(page, limit));
    }
}
