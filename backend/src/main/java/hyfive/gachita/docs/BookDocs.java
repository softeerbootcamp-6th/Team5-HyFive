package hyfive.gachita.docs;

import hyfive.gachita.book.BookStatus;
import hyfive.gachita.book.dto.BookCursor;
import hyfive.gachita.common.dto.ScrollRes;
import hyfive.gachita.common.enums.SearchPeriod;
import hyfive.gachita.book.dto.BookRes;
import hyfive.gachita.book.dto.CreateBookReq;
import hyfive.gachita.common.dto.PagedListRes;
import hyfive.gachita.common.response.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;

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
                    content = @Content(schema = @Schema(implementation = BookRes.class))
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
                    required = true
            )
            @Validated CreateBookReq createBookReq
    );

    @Operation(
            summary = "예약 리스트 조회 API",
            description = "예약 리스트를 조회합니다. 기간(period)과 상태(status)를 조건으로 검색할 수 있으며, 페이지네이션을 지원합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "1000",
                    description = "조회 성공, 예약 생성 시와 동일한 형식의 BookRes 배열을 items 필드에 담아 반환합니다",
                    content = @Content(
                            schema = @Schema(implementation = PagedListRes.class)
//                            array = @ArraySchema(schema = @Schema(implementation = BookRes.class))
                    )
            ),
            @ApiResponse(
                    responseCode = "2000",
                    description = "잘못된 파라미터 값 또는 잘못된 요청 형식",
                    content = @Content()
            )
    })
    BaseResponse<PagedListRes<BookRes>> getBookList(
            @Parameter(
                    name = "period",
                    description = "조회 기간 (예: TODAY, YESTERDAY, WEEK, MONTH / 기본값: TODAY)",
                    required = true,
                    example = "TODAY"
            ) SearchPeriod period,

            @Parameter(
                    name = "status",
                    description = "예약 상태 : 값을 전달하지 않으면 전체 조회 / 기본값: \"\"",
                    required = false,
                    example = "NEW"
            ) BookStatus bookStatus,

            @Parameter(
                    name = "page",
                    description = "페이지 번호 (기본값: 1)",
                    required = true,
                    example = "1"
            ) int page,

            @Parameter(
                    name = "limit",
                    description = "페이지당 항목 수 (기본값: 12)",
                    required = true,
                    example = "12"
            ) int limit
    );

    @Operation(
            summary = "예약 리스트 스크롤 조회 API",
            description = """
        커서 기반으로 가장 최근에 등록된 예약 순(생성일자 비교, 동일하면 아이디 비교)으로 리스트를 조회합니다.
        ** 실제 요청시에는 `/api/book/scroll?status=new&size=2&lastId=9&lastCreatedAt=2025-08-08T15:11:01` 와 같이 쿼리 파라미터 형식으로 요청 가능합니다!**
        - status: 예약 상태는 필수입니다.
        - cursor: 마지막으로 받은 예약 커서 정보로, 필드별로 전달합니다. 작성하지 않으면 가장 최근 등록 예약을 제공합니다.
        - size: 한 번에 가져올 데이터 수 (기본값: 10)
         
        """
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "1000",
                    description = "조회 성공 시, items에 예약 리스트가 포함되며 다음 페이지 여부와 커서 정보도 포함됩니다.",
                    content = @Content(schema = @Schema(implementation = ScrollRes.class))
            ),
            @ApiResponse(
                    responseCode = "2000",
                    description = "잘못된 파라미터 값 또는 잘못된 요청 형식",
                    content = @Content()
            )
    })
    BaseResponse<ScrollRes<BookRes, BookCursor>> getBookListScroll(
            @Parameter(
                    name = "status",
                    description = "예약 상태",
                    required = true,
                    example = "NEW"
            ) BookStatus bookStatus,

            @Parameter(
                    name = "cursor",
                    description = "커서 객체 (Book의 경우, createdAt, id 필드로 구성)",
                    required = false,
                    example = "{\n" +
                            "  \"lastId\": null,\n" +
                            "  \"lastCreatedAt\": null\n" +
                            "}"
            ) @ModelAttribute BookCursor cursor,

            @Parameter(
                    name = "size",
                    description = "한 번에 조회할 데이터 개수 (기본값: 10)",
                    required = false,
                    example = "10"
            ) int size
    );
}