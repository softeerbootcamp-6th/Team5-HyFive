package hyfive.gachita.docs;

import hyfive.gachita.book.dto.BookRes;
import hyfive.gachita.book.dto.CreateBookReq;
import hyfive.gachita.common.response.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.validation.annotation.Validated;

@Tag(name = "book", description = "예약 관련 API")
public interface BookDocs {

    @Operation(
            summary = "예약 생성 API",
            description = "예약 정보를 받아 새로운 예약을 생성합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "1000",
                    description = "예약 생성 성공 시, 아이디와 예약 등록 시점의 데이터를 추가하여 응답",
                    content = @Content()
            ),
            @ApiResponse(
                    responseCode = "2000",
                    description = "필드가 비어있거나 잘못된 body 형식이 요청이 발생하는 경우",
                    content = @Content()
            ),
            @ApiResponse(
                    responseCode = "5000",
                    description = "사용자는 동일한 날짜에 하나의 예약만 가능하므로, 같은 날짜에 여러 건의 예약은 불가합니다.",
                    content = @Content()
            )
    })
    BaseResponse<BookRes> createBook(
            @RequestBody(
                    description = "예약 생성 요청 DTO",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = CreateBookReq.class),
                            examples = @ExampleObject(
                                    name = "예약 생성 예시",
                                    value = "{\n" +
                                            "  \"bookName\": \"홍길동\",\n" +
                                            "  \"bookTel\": \"010-1234-1234\",\n" +
                                            "  \"hospitalDate\": \"2025-08-10\",\n" +
                                            "  \"hospitalTime\": \"10:30\",\n" +
                                            "  \"startAddr\": \"서울특별시 강남구 테헤란로 123\",\n" +
                                            "  \"endAddr\": \"서울특별시 종로구 종로1길 45\",\n" +
                                            "  \"walker\": true\n" +
                                            "}"
                            )
                    )
            )
            @Validated CreateBookReq createBookReq
    );
}