package hyfive.gachita.common.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record ScrollRes<T, C> (
        List<T> items,
        boolean hasNext,
        C cursor
) {}
