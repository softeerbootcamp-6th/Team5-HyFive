package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.InitPathDto;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.NewPathDto;
import hyfive.gachita.dispatch.module.condition.CenterCondition;
import hyfive.gachita.dispatch.module.filter.BoundingBoxFilter;
import hyfive.gachita.dispatch.module.filter.CarSelector;
import hyfive.gachita.dispatch.module.filter.HaversineFilter;
import hyfive.gachita.dispatch.module.provider.CenterListProvider;
import hyfive.gachita.dispatch.module.provider.IdleCarListProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class NewPathDispatchFlow {

    private final CenterListProvider centerListProvider;
    private final BoundingBoxFilter boundingBoxFilter;
    private final HaversineFilter haversineFilter;
    private final IdleCarListProvider idleCarListProvider;
    private final CarSelector carSelector;

    public void execute(NewBookDto newBookDto) {
        List<InitPathDto> centerCandidates = centerListProvider.getAll();

        // TODO : test 메서드 구현
        List<InitPathDto> filteredCenterList = centerCandidates.stream()
                .filter(center -> boundingBoxFilter.test(center, bboxCondition))
                .filter(center -> haversineFilter.test(center, radiusCondition))
                .toList();


        CenterCondition centerCondition = CenterCondition.builder()
                .centerIdList(filteredCenterList)
                .deadline(newBookDto.deadline())
                .hospitalDate(newBookDto.hospitalDate())
                .maybeOnTime(newBookDto.maybeOnTime())
                .walker(newBookDto.walker())
                .build();

        List<NewPathDto> NewPathCandidates = idleCarListProvider.getByCondition(centerCondition);
        NewPathCandidates = carSelector.selectBestCarPerCenter(NewPathCandidates);
    }
}
