package hyfive.gachita.dispatch.module.condition;

import hyfive.gachita.dispatch.dto.NewBookDto;
import lombok.Builder;

import java.time.LocalTime;
import java.util.List;

@Builder
public record PathCondition (
        LocalTime maybeOnTime,
        LocalTime deadline,
        boolean walker,
        List<Long> pathIds
) {
    public static PathCondition from(List<Long> pathIds, NewBookDto newBook) {
        return PathCondition.builder()
                .maybeOnTime(newBook.maybeOnTime())
                .deadline(newBook.deadline())
                .walker(newBook.walker())
                .pathIds(pathIds)
                .build();
    }
}
