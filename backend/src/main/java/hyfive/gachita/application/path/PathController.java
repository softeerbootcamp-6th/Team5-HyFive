package hyfive.gachita.application.path;

import hyfive.gachita.application.common.dto.ScrollRes;
import hyfive.gachita.application.path.dto.PathCursor;
import hyfive.gachita.application.path.dto.PathDetailRes;
import hyfive.gachita.global.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/path")
@RequiredArgsConstructor
public class PathController {
    private final PathService pathService;

    @GetMapping("/scroll")
    public BaseResponse<ScrollRes<PathDetailRes, PathCursor>> getPathListScroll(
            @RequestParam(name = "status", defaultValue = "WAITING") DriveStatus status,
            @ModelAttribute PathCursor cursor,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        return BaseResponse.success(pathService.getPathListScroll(status, cursor, size));
    }
}
