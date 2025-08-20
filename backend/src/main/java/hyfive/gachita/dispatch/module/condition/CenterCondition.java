package hyfive.gachita.dispatch.module.condition;

import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Builder
public record CenterCondition (
        List<Long> centerIdList,
        LocalDate hospitalDate,
        LocalTime maybeOnTime,
        LocalTime deadline,
        boolean walker
) {}
