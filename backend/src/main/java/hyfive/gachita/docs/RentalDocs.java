package hyfive.gachita.docs;

import hyfive.gachita.global.BaseResponse;
import hyfive.gachita.application.rental.dto.ReplaceRental;
import hyfive.gachita.application.rental.dto.RentalRes;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;
import java.util.List;

public interface RentalDocs {

    @Operation(
            summary = "유휴 시간 생성 API",
            description = "차량 id, 날짜, 유휴 시간 리스트 정보를 받아 새로운 유휴 시간을 생성합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "1000",
                    description = "예약 생성 성공 시, 유휴 시간 id, 차량 id 데이터를 추가하여 유휴시간 리스트 응답",
                    content = @Content(schema = @Schema(implementation = RentalRes.class))
            ),
            @ApiResponse(
                    responseCode = "2000",
                    description = "필드가 비어있거나 잘못된 body 형식이 요청이 발생하는 경우",
                    content = @Content()
            ),
            @ApiResponse(
                    responseCode = "3001",
                    description = "등록하려는 유휴시간의 차량이 DB에 존재하지 않는 경우 발생",
                    content = @Content()
            ),
            @ApiResponse(
                    responseCode = "6000",
                    description = "2시간 미만 유휴 시간이 존재하는 경우",
                    content = @Content()
            )
    })
    BaseResponse<List<RentalRes>> replaceWeeklyRentals(
            @Parameter(
                    name = "car-id",
                    description = "유휴 시간을 등록하려는 차량 id",
                    required = true,
                    example = "1"
            )
            @NotNull(message = "차량 id는 필수입니다.") Long carId,

            @Parameter(
                    name = "date",
                    description = "유휴 시간을 등록하려는 주의 특정 날짜",
                    required = true,
                    example = "2025-08-17"
            )
            @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate targetDate,

            @RequestBody(
                    description = "유휴 시간 등록 DTO",
                    required = true
            )
            @Validated List<ReplaceRental> rentalList
    );

    @Operation(
            summary = "유휴 시간 리스트 조회 API",
            description = "차량 id, 날짜, 유휴 시간 리스트 정보를 받아 유휴 시간 리스트를 조회합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "1000",
                    description = "유휴 시간 조회 성공 시, 유휴 시간 id, 차량 id 데이터를 추가하여 유휴시간 리스트 응답",
                    content = @Content(schema = @Schema(implementation = RentalRes.class))
            ),
            @ApiResponse(
                    responseCode = "2000",
                    description = "필드가 비어있거나 잘못된 body 형식이 요청이 발생하는 경우",
                    content = @Content()
            ),
            @ApiResponse(
                    responseCode = "3001",
                    description = "조회하려는 유휴시간의 차량이 DB에 존재하지 않는 경우 발생",
                    content = @Content()
            )
    })
    BaseResponse<List<RentalRes>> getRentalList(
            @Parameter(
                    name = "car-id",
                    description = "유휴 시간을 조회하려는 차량 id",
                    required = true,
                    example = "1"
            )
            @NotNull(message = "차량 id는 필수입니다.") Long carId,

            @Parameter(
                    name = "date",
                    description = "유휴 시간을 조회하려는 주의 특정 날짜",
                    required = true,
                    example = "2025-08-17"
            )
            @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate targetDate
    );
}
