package hyfive.gachita.dispatch.module.filter;

import hyfive.gachita.dispatch.dto.DispatchLocation;
import hyfive.gachita.dispatch.module.filter.condition.FilterCondition;

import java.util.List;

public interface Filter<C extends FilterCondition> {
    List<DispatchLocation> filter(List<DispatchLocation> candidates, C condition);
}