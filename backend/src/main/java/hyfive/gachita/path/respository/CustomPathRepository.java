package hyfive.gachita.path.respository;

import hyfive.gachita.dispatch.module.filter.condition.PathCondition;

import java.util.List;

public interface CustomPathRepository {
    List<Long> searchPathList(PathCondition condition);
}
