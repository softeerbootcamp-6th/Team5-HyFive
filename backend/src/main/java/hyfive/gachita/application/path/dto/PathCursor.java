package hyfive.gachita.application.path.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;

import java.time.LocalTime;

@Builder
public record PathCursor(
        Long lastId,

        @JsonFormat(pattern = "HH:mm")
        LocalTime lastStartTime,

        @JsonFormat(pattern = "HH:mm")
        LocalTime lastEndTime
) {}
