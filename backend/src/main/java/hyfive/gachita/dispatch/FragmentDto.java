package hyfive.gachita.dispatch;

import java.time.Duration;
import java.time.LocalTime;
import java.util.Optional;

public record FragmentDto(
        LocalTime startTime,
        LocalTime endTime
) {
    public static Optional<FragmentDto> of(LocalTime start, LocalTime end) {
        long durationHours = Duration.between(start, end).toHours();
        if (durationHours < 2) {
            return Optional.empty();
        }
        return Optional.of(new FragmentDto(start, end));
    }

    public int fragmentCount() {
        long durationSeconds = java.time.Duration.between(startTime, endTime).getSeconds();
        return (int) (durationSeconds / (2 * 3600)); // 2시간 단위
    }
}
