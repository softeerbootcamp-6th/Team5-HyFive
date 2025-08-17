package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.application.center.repository.CenterRepository;
import hyfive.gachita.dispatch.dto.NewPathDto;
import hyfive.gachita.dispatch.module.condition.CenterCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class IdleCarListProvider {
    private final CenterRepository centerRepository;

    public List<NewPathDto> getByCondition(CenterCondition condition) {
        return centerRepository.searchCarListWithCenter(condition);
    }
}
