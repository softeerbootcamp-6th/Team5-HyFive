package hyfive.gachita.domain.pay.repository;

import org.springframework.data.util.Pair;

import java.time.LocalDateTime;

public interface CustomPayRepository {
    int getAmountByPeriod(Long centerId, Pair<LocalDateTime, LocalDateTime> period);
}
