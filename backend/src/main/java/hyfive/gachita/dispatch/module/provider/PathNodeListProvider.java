package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.application.path.respository.PathRepository;
import hyfive.gachita.dispatch.dto.OldPathCandidateDto;
import hyfive.gachita.dispatch.module.condition.PathCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class PathNodeListProvider  {
    private final PathRepository pathRepository;

    public List<OldPathCandidateDto> getByCondition(PathCondition condition) {
        return pathRepository.searchPathList(condition);
    }
}
