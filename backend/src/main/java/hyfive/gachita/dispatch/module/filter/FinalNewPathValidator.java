package hyfive.gachita.dispatch.module.filter;

import hyfive.gachita.dispatch.dto.FinalNewPathDto;
import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Component
public class FinalNewPathValidator {
    // 첫 운행의 최대 운행 시간 (1시간) 을 초과하는지 확인
    public boolean isFirstPathDurationExceed(FinalNewPathDto path) {
        return path.totalDuration() <= 3600; // 1시간 = 3600초
    }

    // 실제 운행 스케줄(센터 출발 ~ 고객 하차)이 차량의 유휴 시간 내에 포함되는지 확인
    public boolean isScheduleWithinRentalWindow(FinalNewPathDto path) {
        LocalTime startTime = path.nodeList().get(0).time();
        LocalTime endTime = path.nodeList().get(path.nodeList().size() - 1).time();
        LocalTime rentalStartTime = path.path().rentalStartTime();
        LocalTime rentalEndTime = path.path().rentalEndTime();
        return rentalStartTime.isBefore(startTime) && endTime.isBefore(rentalEndTime);
    }
}
