package hyfive.gachita.docs;

import hyfive.gachita.center.dto.CenterRes;
import hyfive.gachita.common.response.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.PathVariable;

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
}