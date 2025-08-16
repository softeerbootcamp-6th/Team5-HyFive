package hyfive.gachita.dispatch.module.condition;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record CenterCondition (
        List<Long> centerIdList,
        LocalDate hospitalDate,
        LocalTime maybeOnTime,
        LocalTime deadline,
        boolean walker
) {}
