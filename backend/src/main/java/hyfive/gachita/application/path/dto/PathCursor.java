package hyfive.gachita.application.path.dto;

import lombok.Builder;

import java.time.LocalTime;

@Builder
public record PathCursor(
        Long lastId,
        LocalTime lastStartTime,
        LocalTime lastEndTime
) {}
