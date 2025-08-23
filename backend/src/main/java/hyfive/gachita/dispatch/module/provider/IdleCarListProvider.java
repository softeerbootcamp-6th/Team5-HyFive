package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.application.center.repository.CenterRepository;
import hyfive.gachita.dispatch.dto.FilteredCenterDto;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.CarScheduleDto;
import hyfive.gachita.dispatch.module.condition.CenterCondition;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class IdleCarListProvider {
    private final CenterRepository centerRepository;

    public List<CarScheduleDto> getByCondition(List<FilteredCenterDto> filteredCenterList, NewBookDto newBookDto) {
        List<Long> centerIdList = filteredCenterList.stream()
                .map(FilteredCenterDto::centerId)
                .toList();

        CenterCondition condition = CenterCondition.builder()
                .centerIdList(centerIdList)
                .deadline(newBookDto.deadline().getSecond())
                .hospitalDate(newBookDto.hospitalDate())
                .maybeOnTime(newBookDto.maybeOnTime())
                .walker(newBookDto.walker())
                .build();

        log.info("유휴 차량 조회 시작. 조건: {}", condition);
        List<CarScheduleDto> carScheduleList = centerRepository.searchCarListWithCenter(condition);
        log.info("유휴 차량 조회 완료. 조회된 차량: {}개", carScheduleList.size());
        return carScheduleList;
    }
}
