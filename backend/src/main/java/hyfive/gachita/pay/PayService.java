package hyfive.gachita.pay;

import hyfive.gachita.common.enums.SearchPeriod;
import hyfive.gachita.common.util.DateRangeUtil;
import hyfive.gachita.pay.repository.PayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PayService {
    private final PayRepository payRepository;

    public int getWeeklyPayAmount(Long centerId) {
        Pair<LocalDateTime, LocalDateTime> currentWeekPeriod = DateRangeUtil.getDateRange(LocalDateTime.now(), SearchPeriod.WEEK);
        return payRepository.getAmountByPeriod(centerId, currentWeekPeriod);
    }
}
