package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.car.Car;
import hyfive.gachita.application.path.Path;
import hyfive.gachita.application.path.PathService;
import hyfive.gachita.application.rental.Rental;
import lombok.Builder;

import java.time.LocalTime;
import java.util.List;

@Builder
public record FinalNewPathDto(
        FilteredCenterDto centerDto,
        Car car,
        Rental rental,
        LocalTime rentalStartTime,
        LocalTime rentalEndTime,
        int totalDuration,
        int totalDistance,
        List<NewPathNodeDto> nodeList
) implements DispatchResult {
    public static FinalNewPathDto from(CarScheduleDto path, int totalDuration, int totalDistance, List<NewPathNodeDto> nodeList) {
        return new FinalNewPathDto(
                path.centerDto(),
                path.car(),
                path.rental(),
                path.rental().getRentalStartTime(),
                path.rental().getRentalEndTime(),
                totalDuration,
                totalDistance,
                nodeList
        );
    }

    @Override
    public Path apply(PathService pathService, Book newBook) {
        return pathService.createPathWithNodes(this, newBook);
    }
}