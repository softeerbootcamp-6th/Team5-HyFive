package hyfive.gachita.dispatch.module.condition;

import lombok.Builder;

import java.time.LocalTime;
import java.util.List;

@Builder
public record PathCondition (
        LocalTime maybeOnTime,
        LocalTime deadline,
        boolean walker,
        List<Long> pathIds
) {}
