package hyfive.gachita.dispatch.module.condition;

import hyfive.gachita.dispatch.dto.FilteredCenterDto;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Builder
public record CenterCondition (
        List<FilteredCenterDto> centerIdList,
        LocalDate hospitalDate,
        LocalTime maybeOnTime,
        LocalTime deadline,
        boolean walker
) {}
