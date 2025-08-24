package hyfive.gachita.docs;

import hyfive.gachita.application.common.dto.PagedListRes;
import hyfive.gachita.application.common.enums.SearchPeriod;
import hyfive.gachita.application.path.dto.MapDrawRes;
import hyfive.gachita.application.path.dto.PassengerRes;
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
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Tag(name = "경로 API", description = "경로 조회 및 관리 API")
public interface PathDocs {
    @Operation(
            summary = "경로별 탑승자 조회",
            description = "주어진 경로 ID에 해당하는 탑승자 목록을 조회합니다."
    )
    @ApiResponse(
            responseCode = "1000",
            description = "성공적으로 탑승자 목록 반환, 탑승 순서를 보장한 리스트를 반환하지만, 순서 번호는 전달하지 않습니다",
            content = @Content(
                    schema = @Schema(implementation = PassengerRes.class)
            )
    )
    @ApiResponse(
            responseCode = "3001",
            description = "요청한 경로와 관련된 정보가 DB에 존재하지 않는 경우 발생",
            content = @Content()
    )
    BaseResponse<List<PassengerRes>> getPathPassengers(
            @Parameter(description = "조회할 경로 ID", example = "1")
            @PathVariable Long pathId
    );

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

    @Operation(
            summary = "경로 리스트 조회 API",
            description = """
            기간(period), 상태(status)를 조건으로 경로 리스트를 조회합니다. 
            페이지네이션(page, limit) 방식으로 결과를 제공합니다.
            """
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "1000",
                    description = "조회 성공, items에 PathDetailRes 리스트가 담겨 반환됩니다.",
                    content = @Content(
                            schema = @Schema(implementation = PagedListRes.class)
                    )
            ),
    })
    @GetMapping("/list")
    BaseResponse<PagedListRes<PathDetailRes>> getPathList(
            @Parameter(
                    name = "period",
                    description = "조회 기간 (TODAY, YESTERDAY, WEEK, MONTH / 기본값: TODAY)",
                    example = "TODAY"
            )
            @RequestParam(name = "period", required = false, defaultValue = "TODAY") SearchPeriod period,

            @Parameter(
                    name = "status",
                    description = "운행 상태 (WAITING, RUNNING, FINISHED) / null 또는 비어있는 값으로 요청하면 전체 상태를 조회",
                    example = "WAITING"
            )
            @RequestParam(name = "status", required = false) DriveStatus status,

            @Parameter(
                    name = "path-id",
                    description = "경로 ID / null 값으로 요청하면 전체 경로를 조회",
                    example = "1"
            )
            @RequestParam(name = "path-id",  required = false) Long pathId,

            @Parameter(
                    name = "page",
                    description = "페이지 번호 (기본값: 1)",
                    example = "1"
            )
            @RequestParam(name = "page", required = false, defaultValue = "1") int page,

            @Parameter(
                    name = "limit",
                    description = "페이지당 항목 수 (기본값: 12)",
                    example = "12"
            )
            @RequestParam(name = "limit", required = false, defaultValue = "12") int limit
    );

    @Operation(
            summary = "경로별 지도 정보 조회",
            description = "주어진 경로 ID에 해당하는 노드 및 폴리라인 정보를 조회합니다. " +
                    "노드별 좌표와 연결된 세그먼트(polyline) 정보, 마커 정보 등을 포함합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "1000",
                    description = "성공적으로 지도용 데이터를 반환합니다.",
                    content = @Content(
                            schema = @Schema(implementation = MapDrawRes.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "3001",
                    description = "요청한 경로 ID가 존재하지 않는 경우 발생",
                    content = @Content()
            )
    })
    BaseResponse<MapDrawRes> getMapDraw(
            @Parameter(
                    description = "조회할 경로 ID",
                    example = "1",
                    required = true
            )
            @PathVariable("id") @NotNull Long id
    );
}
