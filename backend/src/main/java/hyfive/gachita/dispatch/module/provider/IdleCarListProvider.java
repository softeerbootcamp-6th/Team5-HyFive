package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.application.center.repository.CenterRepository;
import hyfive.gachita.dispatch.dto.DispatchLocation;
import hyfive.gachita.dispatch.dto.IdleCarDto;
import hyfive.gachita.dispatch.dto.InitPathDto;
import hyfive.gachita.dispatch.module.condition.CenterCondition;
import hyfive.gachita.dispatch.module.condition.Condition;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class IdleCarListProvider implements DispatchLocationProvider {
    private final CenterRepository centerRepository;

    @Override
    public List<DispatchLocation> getByCondition(Condition condition) {
        List<IdleCarDto> carList = centerRepository.searchCarListWithCenter((CenterCondition)condition);

        CenterCondition centerCondition = (CenterCondition) condition;
        LocalTime maybeOnTime = centerCondition.maybeOnTime();
        LocalTime deadline = centerCondition.deadline();

        return carList.stream()
                .map(idleCar -> InitPathDto.builder()
                        .carId(idleCar.carId())
                        .centerId(idleCar.centerId())
                        .centerLat(idleCar.centerLat())
                        .centerLng(idleCar.centerLng())
                        .maybeOnTime(maybeOnTime)
                        .deadline(deadline)
                        .build())
                .collect(Collectors.toList());
    }
}
