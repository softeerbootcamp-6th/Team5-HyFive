package hyfive.gachita.application.path.respository;

import hyfive.gachita.dispatch.dto.OldPathCandidateDto;
import hyfive.gachita.dispatch.module.condition.PathCondition;

import java.util.List;

public interface CustomPathRepository {
    List<OldPathCandidateDto> searchPathList(PathCondition condition);
}
