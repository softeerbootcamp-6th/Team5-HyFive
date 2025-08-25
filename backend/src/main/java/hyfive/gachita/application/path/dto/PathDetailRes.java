package hyfive.gachita.application.path.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import hyfive.gachita.application.path.DriveStatus;
import hyfive.gachita.application.path.Path;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalTime;

import static hyfive.gachita.application.common.util.CarNumberFormatter.format;

@Builder
public record PathDetailRes(
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
        String endAddr,

        @Schema(description = "센터 이름", example = "노원센터")
        String centerName,

        @Schema(description = "운행 상태", example = "WAITING, RUNNING, FINISHED")
        DriveStatus driveStatus,

        @Schema(description = "탑승자 수", example = "3")
        int userCount
) {
        public static PathDetailRes from(Path path) {
                return new PathDetailRes(
                        path.getId(),
                        format(path.getCar().getCarNumber()),
                        path.getRealStartTime(),
                        path.getRealEndTime(),
                        path.getStartAddr(),
                        path.getEndAddr(),
                        path.getCar().getCenter().getCenterName(),
                        path.getDriveStatus(),
                        path.getUserCount()
                );
        }
}