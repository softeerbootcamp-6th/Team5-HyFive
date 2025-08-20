package hyfive.gachita.application.path;

import hyfive.gachita.application.common.dto.PagedListRes;
import hyfive.gachita.application.common.dto.ScrollRes;
import hyfive.gachita.application.common.enums.SearchPeriod;
import hyfive.gachita.application.path.dto.PassengerRes;
import hyfive.gachita.application.path.dto.PathCursor;
import hyfive.gachita.application.path.dto.PathDetailRes;
import hyfive.gachita.docs.PathDocs;
import hyfive.gachita.global.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/path")
@RequiredArgsConstructor
public class PathController implements PathDocs {
    private final PathService pathService;

    @GetMapping("/{pathId}/passenger")
    public BaseResponse<List<PassengerRes>> getPathPassengers(@PathVariable Long pathId) {
        return BaseResponse.success(pathService.getPathPassengers(pathId));
    }

    @GetMapping("/scroll")
    public BaseResponse<ScrollRes<PathDetailRes, PathCursor>> getPathListScroll(
            @RequestParam(name = "status", defaultValue = "WAITING") DriveStatus status,
            @ModelAttribute PathCursor cursor,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        return BaseResponse.success(pathService.getPathListScroll(status, cursor, size));
    }

    @GetMapping("/list")
    public BaseResponse<PagedListRes<PathDetailRes>> getPathList(
            @RequestParam(name = "period", required = false, defaultValue = "TODAY") SearchPeriod period,
            @RequestParam(name = "status") DriveStatus status,
            @RequestParam(name = "page", required = false, defaultValue = "1") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "12") int limit
    ) {
        return BaseResponse.success(pathService.getPathList(period, status, page, limit));
    }
}
