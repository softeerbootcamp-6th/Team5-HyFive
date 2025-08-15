package hyfive.gachita.domain.center.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "센터 목록 아이템 DTO")
public record CenterListRes(
        @Schema(description = "센터 ID", example = "1")
        Long centerId,

        @Schema(description = "센터 이름", example = "노원바른데이케어")
        String centerName,

        @Schema(description = "센터 전화번호", example = "02-1234-5678")
        String centerTel,

        // 기획서에는 구까지만 표기, 현재는 노원구만 제공해서 어떻게할지?
        @Schema(description = "센터 위치 주소", example = "서울특별시 노원구 동일로 123")
        String centerAddr,

        @Schema(description = "등록 차량 대수", example = "4")
        long carCount,

        @Schema(description = "등록 저상형 차량 대수", example = "1")
        long lowCarCount
) {}
