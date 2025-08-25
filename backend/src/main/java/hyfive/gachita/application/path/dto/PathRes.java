package hyfive.gachita.application.path.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import hyfive.gachita.application.path.Path;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalTime;

@Builder
public record PathRes(
        @Schema(description = "경로 ID", example = "1")
        Long pathId,

        @Schema(description = "차량 번호", example = "12가 3456")
        String carNumber,

        @Schema(description = "운행 시작 시간", example = "09:30")
        @JsonFormat(pattern = "HH:mm")
        LocalTime startTime,

        @Schema(description = "운행 종료 시간", example = "10:45")
        @JsonFormat(pattern = "HH:mm")
        LocalTime endTime,

        @Schema(description = "출발지 주소", example = "노원로16길 15")
        String startAddr,

        @Schema(description = "도착지 주소", example = "한글비석로 68")
        String endAddr
) {
        @QueryProjection
        public PathRes(Long pathId, String carNumber, LocalTime startTime,
                       LocalTime endTime, String startAddr, String endAddr) {
                this.pathId = pathId;
                this.carNumber = carNumber;
                this.startTime = startTime;
                this.endTime = endTime;
                this.startAddr = startAddr;
                this.endAddr = endAddr;
        }

        public static PathRes from(Path path) {
                return new PathRes(
                        path.getId(),
                        path.getCar().getCarNumber(),
                        path.getRealStartTime(),
                        path.getRealEndTime(),
                        path.getStartAddr(),
                        path.getEndAddr()
                );
        }
}