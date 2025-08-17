package hyfive.gachita.dispatch.module.filter;

import hyfive.gachita.application.center.repository.CenterRepository;
import hyfive.gachita.dispatch.dto.NewPathDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CarSelector {
    private final CenterRepository centerRepository;

    public List<NewPathDto> selectBestCarPerCenter(List<NewPathDto> candidates) {
        Map<Long, List<NewPathDto>> groupedByCenter = candidates.stream()
                .collect(Collectors.groupingBy(NewPathDto::centerId));

        List<NewPathDto> bestCarList = new ArrayList<>();

        for (Map.Entry<Long, List<NewPathDto>> entry : groupedByCenter.entrySet()) {
            entry.getValue().stream()
                    .max(Comparator
                            // 1. 예상 운행 시간 가장 긴 차
                            .comparing((NewPathDto car) ->
                                    Duration.between(car.rentalStartTime(), car.rentalEndTime()).toSeconds())
                            // 2. 탑승 인원 수 많은 차
                            .thenComparing(NewPathDto::carCapacity, Comparator.reverseOrder())
                            // 3. car_id 오름차순
                            .thenComparing(NewPathDto::carId)
                    ).ifPresent(bestCarList::add);

        }
        return bestCarList;
    }
}
