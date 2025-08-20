package hyfive.gachita.application.path.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalTime;

@Builder
public record PassengerRes(
        @Schema(description = "탑승객 이름", example = "홍길동")
        String name,

        @Schema(description = "탑승객 전화번호", example = "010-1234-5678")
        String phoneNumber,

        @Schema(description = "보행기구 유무", example = "true")
        boolean walker,

        @Schema(description = "탑승 예정 시간", example = "09:30")
        @JsonFormat(pattern = "HH:mm")
        LocalTime onTime,

        @Schema(description = "하차 예정 시간", example = "10:45")
        @JsonFormat(pattern = "HH:mm")
        LocalTime offTime
) {
}