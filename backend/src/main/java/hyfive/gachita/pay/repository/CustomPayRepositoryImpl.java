package hyfive.gachita.pay.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static hyfive.gachita.pay.QPay.pay;

@RequiredArgsConstructor
public class CustomPayRepositoryImpl implements CustomPayRepository {

    private final JPAQueryFactory queryFactory;


    @Override
    public int getAmountByPeriod(Long centerId, Pair<LocalDateTime, LocalDateTime> period) {
        LocalDate startDate = period.getFirst().toLocalDate();
        LocalDate endDate = period.getSecond().toLocalDate();

        Integer sum = queryFactory
                .select(pay.amount.sum())
                .from(pay)
                .where(
                        pay.center.id.eq(centerId),
                        pay.payDate.between(startDate, endDate)
                )
                .fetchOne();

        return sum != null ? sum : 0;
    }
}