package hyfive.gachita.dispatch.module.condition;

import java.time.LocalDate;

public record PathCandidateCondition(
        LocalDate hospitalDate
) implements Condition {
}
