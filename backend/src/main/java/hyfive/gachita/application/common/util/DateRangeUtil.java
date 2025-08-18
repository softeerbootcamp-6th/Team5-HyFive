package hyfive.gachita.application.common.util;

import hyfive.gachita.application.common.enums.SearchPeriod;
import org.springframework.data.util.Pair;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;

public class DateRangeUtil {
    public static Pair<LocalDateTime, LocalDateTime> getDateRange(LocalDateTime date, SearchPeriod period) {
        Pair<LocalDate, LocalDate> dateRange = getDateRange(date.toLocalDate(), period);
        return Pair.of(
                dateRange.getFirst().atStartOfDay(),
                dateRange.getSecond().atTime(LocalTime.MAX)
        );
    }

    public static Pair<LocalDate, LocalDate> getDateRange(LocalDate date, SearchPeriod period) {
        return switch (period) {
            case TODAY -> Pair.of(date, date);
            case YESTERDAY -> Pair.of(date.minusDays(1), date.minusDays(1));
            case WEEK -> Pair.of(
                    date.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY)),
                    date.with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY))
            );
            case MONTH -> Pair.of(
                    date.with(TemporalAdjusters.firstDayOfMonth()),
                    date.with(TemporalAdjusters.lastDayOfMonth())
            );
        };
    }
}
