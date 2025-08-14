package hyfive.gachita.common.util;

import hyfive.gachita.common.enums.SearchPeriod;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.util.Pair;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;

class DateRangeUtilTest {

    // 테스트 기준 날짜 (2025년 8월 12일 화요일)
    private final LocalDate BASE_DATE = LocalDate.of(2025, 8, 12);
    private final LocalDateTime BASE_DATE_TIME = BASE_DATE.atTime(10, 30);

    @Test
    @DisplayName("LocalDate: TODAY를 입력하면 해당 날짜를 그대로 반환한다")
    void getLocalDateRange_Today() {
        // when
        Pair<LocalDate, LocalDate> range = DateRangeUtil.getDateRange(BASE_DATE, SearchPeriod.TODAY);

        // then
        assertThat(range.getFirst()).isEqualTo(BASE_DATE);
        assertThat(range.getSecond()).isEqualTo(BASE_DATE);
    }

    @Test
    @DisplayName("LocalDate: YESTERDAY를 입력하면 어제 날짜를 반환한다")
    void getLocalDateRange_Yesterday() {
        // given
        LocalDate yesterday = BASE_DATE.minusDays(1);

        // when
        Pair<LocalDate, LocalDate> range = DateRangeUtil.getDateRange(BASE_DATE, SearchPeriod.YESTERDAY);

        // then
        assertThat(range.getFirst()).isEqualTo(yesterday);
        assertThat(range.getSecond()).isEqualTo(yesterday);
    }

    @Test
    @DisplayName("LocalDate: WEEK를 입력하면 해당 날짜가 포함된 일요일~토요일을 반환한다")
    void getLocalDateRange_Week() {
        // given
        LocalDate expectedSunday = LocalDate.of(2025, 8, 10);
        LocalDate expectedSaturday = LocalDate.of(2025, 8, 16);

        // when
        Pair<LocalDate, LocalDate> range = DateRangeUtil.getDateRange(BASE_DATE, SearchPeriod.WEEK);

        // then
        assertThat(range.getFirst()).isEqualTo(expectedSunday);
        assertThat(range.getSecond()).isEqualTo(expectedSaturday);
    }

    @Test
    @DisplayName("LocalDate: MONTH를 입력하면 해당 월의 1일과 마지막 날을 반환한다")
    void getLocalDateRange_Month() {
        // given
        LocalDate expectedFirstDay = LocalDate.of(2025, 8, 1);
        LocalDate expectedLastDay = LocalDate.of(2025, 8, 31);

        // when
        Pair<LocalDate, LocalDate> range = DateRangeUtil.getDateRange(BASE_DATE, SearchPeriod.MONTH);

        // then
        assertThat(range.getFirst()).isEqualTo(expectedFirstDay);
        assertThat(range.getSecond()).isEqualTo(expectedLastDay);
    }

    @Test
    @DisplayName("LocalDateTime: 기간을 조회하면 시작일의 00:00:00과 종료일의 23:59:59.999...를 반환한다")
    void getLocalDateTimeRange() {
        // given
        LocalDate firstDayOfMonth = LocalDate.of(2025, 8, 1);
        LocalDate lastDayOfMonth = LocalDate.of(2025, 8, 31);

        LocalDateTime expectedStart = firstDayOfMonth.atStartOfDay();
        LocalDateTime expectedEnd = lastDayOfMonth.atTime(LocalTime.MAX);

        // when
        Pair<LocalDateTime, LocalDateTime> range = DateRangeUtil.getDateRange(BASE_DATE_TIME, SearchPeriod.MONTH);

        // then
        assertThat(range.getFirst()).isEqualTo(expectedStart);
        assertThat(range.getSecond()).isEqualTo(expectedEnd);
    }
}