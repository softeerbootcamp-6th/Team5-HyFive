package hyfive.gachita.docs;

import hyfive.gachita.application.common.dto.ScrollRes;
import hyfive.gachita.application.path.DriveStatus;
import hyfive.gachita.application.path.dto.PathCursor;
import hyfive.gachita.application.path.dto.PathDetailRes;
import hyfive.gachita.global.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "경로 API", description = "경로 조회 및 관리 API")
public interface PathDocs {

    @Operation(
            summary = "경로 스크롤 조회",
            description = "커서 기반 스크롤 방식으로 오늘의 실시간 경로 목록을 조회합니다. " +
                    "status(운행 상태), cursor(마지막 조회 위치), size(조회 개수)를 기준으로 다음 페이지 데이터를 반환합니다."
    )
    @ApiResponse(
            responseCode = "1000",
            description = "성공적으로 경로 목록을 조회함",
            content = @Content(
                    schema = @Schema(implementation = ScrollRes.class)
            )
    )
    BaseResponse<ScrollRes<PathDetailRes, PathCursor>> getPathListScroll(
            @Parameter(
                    description = """
                    운행 상태 (WAITING, RUNNING, FINISHED)
                    ** 실제 요청시에는 `localhost:8080/api/path/scroll?status=waiting&size=3&lastId=2&lastStartTime=09:59:10&lastEndTime=09:30:00` 와 같이 쿼리 파라미터 형식으로 요청 가능합니다!**
                    커서의 필드를 모두 전달하지 않거나 커서의 필드가 비어있으면, 가장 최근의 경로부터 조회됩니다.
                    """,
                    example = "WAITING"
            )
            @RequestParam(name = "status", defaultValue = "WAITING") DriveStatus status,

            @Parameter(
                    description = "커서 정보 (마지막으로 조회된 경로 위치)",
                    required = false
            )
            @ModelAttribute PathCursor cursor,

            @Parameter(
                    description = "조회할 데이터 개수",
                    example = "10"
            )
            @RequestParam(name = "size", defaultValue = "10") int size
    );
}