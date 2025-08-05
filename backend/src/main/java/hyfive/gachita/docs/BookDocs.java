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
                    description = "예약 생성 성공",
                    content = @Content(
                            schema = @Schema(implementation = BaseResponse.class),
                            examples = @ExampleObject(
                                    value = "{\n" +
                                            "    \"isSuccess\": true,\n" +
                                            "    \"code\": 1000,\n" +
                                            "    \"message\": \"요청에 성공했습니다.\",\n" +
                                            "    \"data\": {\n" +
                                            "        \"id\": 1,\n" +
                                            "        \"bookName\": \"홍길동\",\n" +
                                            "        \"bookTel\": \"010-1234-1234\",\n" +
                                            "        \"bookDate\": \"2025-08-05\",\n" +
                                            "        \"bookTime\": \"16:08\",\n" +
                                            "        \"hospitalDate\": \"2025-08-10\",\n" +
                                            "        \"hospitalTime\": \"10:30\",\n" +
                                            "        \"startAddr\": \"서울특별시 강남구 테헤란로 123\",\n" +
                                            "        \"endAddr\": \"서울특별시 종로구 종로1길 45\",\n" +
                                            "        \"walker\": true,\n" +
                                            "        \"bookStatus\": \"NEW\"\n" +
                                            "    }\n" +
                                            "}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "2000",
                    description = "유효성 검사(비어있는 값) 실패 또는 잘못된 요청(동일한 일자의 중복 요청)",
                    content = @Content(
                            schema = @Schema(implementation = BaseResponse.class),
                            examples = @ExampleObject(
                                    value = "{\n" +
                                            "    \"isSuccess\": false,\n" +
                                            "    \"code\": 2000,\n" +
                                            "    \"message\": \"예약 불가: 동일한 사용자에 의해 이미 예약된 날짜입니다.\"\n" +
                                            "}"
                            )
                    )
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