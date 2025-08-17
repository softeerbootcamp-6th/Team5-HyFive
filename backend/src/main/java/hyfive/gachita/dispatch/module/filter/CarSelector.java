package hyfive.gachita.dispatch.module.filter;

import hyfive.gachita.application.center.repository.CenterRepository;
import hyfive.gachita.dispatch.dto.NewPathDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CarSelector {
    private final CenterRepository centerRepository;

    public Optional<NewPathDto> selectBestCarForSingleCenter(List<NewPathDto> cars) {
        return cars.stream()
                .max(Comparator
                        // 1. 예상 운행 시간 가장 긴 차
                        .comparing((NewPathDto car) ->
                                Duration.between(car.rentalStartTime(), car.rentalEndTime()).toSeconds())
                        // 2. 탑승 인원 수 많은 차
                        .thenComparing(NewPathDto::carCapacity, Comparator.reverseOrder())
                        // 3. car_id 오름차순
                        .thenComparing(NewPathDto::carId)
                );
    }
}
