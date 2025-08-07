package hyfive.gachita.docs;

import hyfive.gachita.car.dto.CarRes;
import hyfive.gachita.car.dto.CreateCarReq;
import hyfive.gachita.car.dto.UpdateCarReq;
import hyfive.gachita.common.response.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "car", description = "차량 관련 API")
public interface CarDocs {

    @Operation(
            summary = "차량 생성 API",
            description = "차량 정보를 받아 새로운 차량 정보를 생성합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "1000",
                    description = "차량 생성 성공 시, 아이디와 차량 등록 시점의 데이터를 추가하여 응답",
                    content = @Content(schema = @Schema(implementation = CarRes.class))
            ),
            @ApiResponse(
                    responseCode = "2000",
                    description = "필드가 비어있거나 잘못된 body 형식이 요청이 발생하는 경우 발생",
                    content = @Content()
            ),
            @ApiResponse(
                    responseCode = "3001",
                    description = "등록하려는 차량의 센터가 DB에 존재하지 않는 경우 발생",
                    content = @Content()
            ),
            @ApiResponse(
                    responseCode = "3005",
                    description = "첨부한 차량 이미지의 사이즈가 10MB를 초과했을 경우 발생",
                    content = @Content()
            ),
            @ApiResponse(
                    responseCode = "4500",
                    description = "차량을 초과 등록하려고 하는 경우 발생 (최대 6대)",
                    content = @Content()
            ),
            @ApiResponse(
                    responseCode = "4501",
                    description = "중복된 차량 번호가 존재하는 경우 발생",
                    content = @Content()
            )
    })
    BaseResponse<CarRes> createCar(
            @ModelAttribute CreateCarReq createCarReq
    );

    @Operation(
            summary = "차량 정보 수정 API",
            description = "차량 ID와 수정할 차량 정보를 받아 차량 정보를 업데이트합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "1000",
                    description = "차량 정보 수정 성공 시, 수정된 차량 정보를 응답합니다.",
                    content = @Content(schema = @Schema(implementation = CarRes.class))
            ),
            @ApiResponse(
                    responseCode = "2000",
                    description = "필드가 비어있거나 잘못된 body 형식으로 요청한 경우 발생",
                    content = @Content()
            ),
            @ApiResponse(
                    responseCode = "3001",
                    description = "요청한 차량 ID가 DB에 존재하지 않는 경우 발생",
                    content = @Content()
            ),
            @ApiResponse(
                    responseCode = "3005",
                    description = "첨부한 차량 이미지의 사이즈가 10MB를 초과했을 경우 발생",
                    content = @Content()
            ),
            @ApiResponse(
                    responseCode = "4501",
                    description = "중복된 차량 번호가 존재하는 경우 발생",
                    content = @Content()
            )
    })
    BaseResponse<CarRes> updateCar(
            @PathVariable("id") Long id,
            @ModelAttribute UpdateCarReq updateCarReq
    );
}
