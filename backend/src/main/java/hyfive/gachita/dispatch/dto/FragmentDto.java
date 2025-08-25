package hyfive.gachita.dispatch.dto;

import java.time.Duration;
import java.time.LocalTime;
import java.util.Optional;

public record FragmentDto(
        LocalTime startTime,
        LocalTime endTime
) {
    private static final int HOUR_IN_SECONDS = 3600;

    public static Optional<FragmentDto> of(LocalTime start, LocalTime end) {
        long durationHours = Duration.between(start, end).toHours();
        if (durationHours < 2) {
            return Optional.empty();
        }
        return Optional.of(new FragmentDto(start, end));
    }

    public static Optional<FragmentDto> ofFirst(FinalNewPathDto path) {
        return of(path.rentalStartTime(), path.nodeList().get(0).time());
    }

    public static Optional<FragmentDto> ofSecond(FinalNewPathDto path) {
        LocalTime driveEnd = path.nodeList().get(0).time();
        LocalTime maxRentalEnd = path.availableRental().getRental().getRentalEndTime();
        LocalTime startTime = driveEnd.isBefore(maxRentalEnd) ? driveEnd : maxRentalEnd;
        return of(startTime, path.rentalEndTime());
    }

    public int fragmentCount() {
        long durationSeconds = Duration.between(startTime, endTime).getSeconds();
        return (int) (durationSeconds / (2 * HOUR_IN_SECONDS));
    }
}