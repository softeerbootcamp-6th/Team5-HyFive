package hyfive.gachita.common.enums;

import org.springframework.data.util.Pair;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;

public enum SearchPeriod {
    TODAY,
    YESTERDAY,
    WEEK,
    MONTH;

    public static Pair<LocalDateTime, LocalDateTime> getDateRange(SearchPeriod period) {
        LocalDateTime today = LocalDateTime.now();
        return switch (period) {
            case TODAY -> Pair.of(today, today);
            case YESTERDAY -> Pair.of(today.minusDays(1), today.minusDays(1));
            case WEEK -> Pair.of(
                    today.with(TemporalAdjusters.previous(DayOfWeek.SUNDAY)),
                    today.with(DayOfWeek.SATURDAY)
            );
            case MONTH -> Pair.of(
                    today.withDayOfMonth(1),
                    today.withDayOfMonth(today.getDayOfMonth())
            );
        };
    }
}
