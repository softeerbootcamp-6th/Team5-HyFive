package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.FinalNewPathDto;
import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Component
public class FinalNewPathSelector {
    // 차량 출발 시각과 유휴 시작 시간의 차이를 최소화
    public int compareStartTimeDifference(FinalNewPathDto path) {
        LocalTime startTime = path.nodeList().get(0).time();
        LocalTime rentalStartTime = path.path().rentalStartTime();
        return startTime.toSecondOfDay() - rentalStartTime.toSecondOfDay();
    }
}
