package hyfive.gachita.application.path.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import hyfive.gachita.client.geocode.dto.LatLng;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalTime;

@Builder
@Schema(description = "특정 예약 경로 하이라이트 dto")
public record HighlightRes(
        @Schema(description = "예약 ID", example = "1")
        Long bookId,

        @Schema(description = "예약자 이름 또는 센터 이름", example = "김코드")
        String bookName,

        @Schema(description = "승차 시간 (HH:mm)", example = "10:00")
        @JsonFormat(pattern = "HH:mm")
        LocalTime starTime,

        @Schema(description = "하차 시간 (HH:mm)", example = "10:30")
        @JsonFormat(pattern = "HH:mm")
        LocalTime endTime,

        @Schema(description = "탑승 주소", example = "탑승로 123")
        String startAddr,

        @Schema(description = "하차 주소", example = "하차로 123")
        String endAddr,

        @Schema(description = "시작(탑승) 좌표", implementation = LatLng.class)
        LatLng startLoc,

        @Schema(description = "종료(하차) 좌표", implementation = LatLng.class)
        LatLng endLoc,

        @Schema(description = "하이라이트 구간에 포함된 세그먼트 ID 리스트", example = "[2,3,4]")
        int[] segmentList
) {
}
