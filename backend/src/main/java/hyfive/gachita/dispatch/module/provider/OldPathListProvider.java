package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.application.path.respository.PathRepository;
import hyfive.gachita.dispatch.dto.OldPathDto;
import hyfive.gachita.dispatch.module.condition.PathCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OldPathListProvider {
    private final PathRepository pathRepository;

    public List<OldPathDto> getByCondition(PathCondition condition) {
        return pathRepository.searchPathList(condition);
    }
}
