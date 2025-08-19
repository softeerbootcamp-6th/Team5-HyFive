package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.application.center.repository.CenterRepository;
import hyfive.gachita.dispatch.dto.CenterDto;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.CarScheduleDto;
import hyfive.gachita.dispatch.module.condition.CenterCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class IdleCarListProvider {
    private final CenterRepository centerRepository;

    public List<CarScheduleDto> getByCondition(List<CenterDto> filteredCenterList, NewBookDto newBookDto) {
        CenterCondition condition = CenterCondition.builder()
                .centerIdList(filteredCenterList)
                .deadline(newBookDto.deadline().getSecond())
                .hospitalDate(newBookDto.hospitalDate())
                .maybeOnTime(newBookDto.maybeOnTime())
                .walker(newBookDto.walker())
                .build();

        return centerRepository.searchCarListWithCenter(condition);
    }
}
