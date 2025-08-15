package hyfive.gachita.dispatch.module.filter.condition;

import java.time.LocalTime;

public record PathCondition (
        LocalTime maybeOnTime,
        LocalTime deadline,
        boolean walker
) {}
