package hyfive.gachita.application.path.respository;

import hyfive.gachita.dispatch.dto.OldPathDto;
import hyfive.gachita.dispatch.module.condition.PathCondition;

import java.util.List;

public interface CustomPathRepository {
    List<OldPathDto> searchPathList(PathCondition condition);
}
