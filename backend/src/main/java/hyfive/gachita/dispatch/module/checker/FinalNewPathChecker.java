package hyfive.gachita.dispatch.module.checker;

import hyfive.gachita.dispatch.dto.FinalNewPathDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Component
@Slf4j
public class FinalNewPathChecker {
    // 첫 운행의 최대 운행 시간 (1시간) 을 초과하는지 확인
    public boolean isFirstPathDurationExceed(FinalNewPathDto path) {
        boolean isExceed = path.totalDuration() <= 3600; // 1시간 = 3600초
        log.debug("운행 시간 초과 확인 (1시간): {}, path: {}", isExceed, path);
        return isExceed;
    }

    // 실제 운행 스케줄(센터 출발 ~ 고객 하차)이 차량의 유휴 시간 내에 포함되는지 확인
    public boolean isScheduleWithinRentalWindow(FinalNewPathDto path) {
        LocalTime startTime = path.nodeList().get(0).time();
        LocalTime endTime = path.nodeList().get(path.nodeList().size() - 1).time();
        LocalTime rentalStartTime = path.rentalStartTime();
        LocalTime rentalEndTime = path.rentalEndTime();
        boolean isWithin = rentalStartTime.isBefore(startTime) && endTime.isBefore(rentalEndTime);
        log.debug("유휴 시간 내 운행 확인: {}, path: {}", isWithin, path);
        return isWithin;
    }

    // 차량 출발 시각과 유휴 시작 시간의 차이를 최소화
    public int compareStartTimeDifference(FinalNewPathDto path) {
        LocalTime startTime = path.nodeList().get(0).time();
        LocalTime rentalStartTime = path.rentalStartTime();
        int diff = startTime.toSecondOfDay() - rentalStartTime.toSecondOfDay();
        log.debug("유휴 시작 시간과 차량 출발 시각 차이: {}초, path: {}", diff, path);
        return diff;
    }
}
