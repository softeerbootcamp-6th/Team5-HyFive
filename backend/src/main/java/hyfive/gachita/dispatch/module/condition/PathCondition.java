package hyfive.gachita.dispatch.module.condition;

import java.time.LocalTime;

public record PathCondition (
        LocalTime maybeOnTime,
        LocalTime deadline,
        boolean walker
) {}
