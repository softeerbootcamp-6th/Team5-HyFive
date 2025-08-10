package hyfive.gachita.docs;

import hyfive.gachita.center.dto.CenterListRes;
import hyfive.gachita.center.dto.CenterRes;
import hyfive.gachita.common.dto.PagedListRes;
import hyfive.gachita.common.response.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "center", description = "센터 관련 API")
public interface CenterDocs {

    @Operation(
            summary = "센터 상세 정보 API",
            description = "센터 ID를 받아 센터 상세 정보를 가져옵니다."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "1000",
                    description = "센터 상세 정보 조회 성공 시, 센터 정보를 응답합니다.",
                    content = @Content(schema = @Schema(implementation = CenterRes.class))
            ),
            @ApiResponse(
                    responseCode = "3001",
                    description = "요청한 센터 ID가 DB에 존재하지 않는 경우 발생",
                    content = @Content()
            )
    })
    BaseResponse<CenterRes> getCenter(
            @PathVariable("id") @NotNull Long id
    );

    @Operation(
            summary = "센터 리스트 조회 API",
            description = "페이지 번호와 페이지당 아이템 수를 받아 센터 리스트를 페이징 형태로 반환합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "1000",
                    description = "센터 리스트 조회 성공 시, 페이징된 센터 리스트를 응답합니다.",
                    content = @Content(schema = @Schema(implementation = PagedListRes.class))
            ),
            @ApiResponse(
                    responseCode = "2000",
                    description = "잘못된 요청 파라미터일 경우 발생",
                    content = @Content()
            )
    })
    BaseResponse<PagedListRes<CenterListRes>> getCenterList(
            @RequestParam(name = "page", required = false, defaultValue = "1") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "8") int limit
    );
}