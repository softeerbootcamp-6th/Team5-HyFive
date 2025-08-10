package hyfive.gachita.pay.repository;

import hyfive.gachita.pay.Pay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.util.Pair;

import java.time.LocalDateTime;

public interface PayRepository extends JpaRepository<Pay, Long>, CustomPayRepository {
    int getAmountByPeriod(Long centerId, Pair<LocalDateTime, LocalDateTime> period);
}
