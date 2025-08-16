package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.dispatch.dto.DispatchLocation;
import hyfive.gachita.dispatch.dto.PathDispatchDto;
import hyfive.gachita.dispatch.module.condition.Condition;
import hyfive.gachita.dispatch.module.condition.PathCondition;
import hyfive.gachita.application.path.respository.PathRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class NodeDispatchLocationProvider  {
    private final PathRepository pathRepository;

    public List<PathDispatchDto> getByCondition(PathCondition condition) {
        return pathRepository.searchPathList(condition);
    }
}
