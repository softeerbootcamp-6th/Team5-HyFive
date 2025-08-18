package hyfive.gachita.application.center.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "센터 응답 DTO")
public record CenterRes(
        @Schema(description = "센터 ID", example = "1")
        Long centerId,

        @Schema(description = "센터 이름", example = "노원바른데이케어")
        String centerName,

        @Schema(description = "센터 전화번호", example = "02-1234-5678")
        String centerTel,

        @Schema(description = "센터 위치 주소", example = "서울특별시 노원구 동일로 123")
        String centerAddr,

        @Schema(description = "등록 차량 대수", example = "4")
        long carCount,

        @Schema(description = "이번 수 예상 수익", example = "1500000")
        long payAmount
) {}