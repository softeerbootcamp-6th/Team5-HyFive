package hyfive.gachita.path.respository;

import hyfive.gachita.dispatch.dto.PathDispatchDto;
import hyfive.gachita.dispatch.module.condition.PathCondition;

import java.util.List;

public interface CustomPathRepository {
    List<PathDispatchDto> searchPathList(PathCondition condition);
}
