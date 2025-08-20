package hyfive.gachita.docs;

import hyfive.gachita.application.path.dto.PassengerRes;
import hyfive.gachita.global.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PathVariable;

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
}
