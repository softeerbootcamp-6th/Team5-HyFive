package hyfive.gachita.dispatch.module.condition;

import java.time.LocalTime;
import java.util.List;

public record PathCondition (
        LocalTime maybeOnTime,
        LocalTime deadline,
        boolean walker,
        List<Long> pathIds
) {}
