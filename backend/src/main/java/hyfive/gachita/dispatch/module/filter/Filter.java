package hyfive.gachita.dispatch.module.filter;

import hyfive.gachita.dispatch.dto.FilterDto;
import hyfive.gachita.dispatch.module.filter.condition.FilterCondition;

import java.util.List;

/**
 * 요약 : 필터링 인터페이스
 * @param : 필터링 전 후보들(candidates), 필터링 조건(condition)
 * @return : 필터링 결과 리스트 List<FilterDto>
 * 사용 방법 :
 *  - (예시 구현체) HarversineFilter.java
 */
public interface Filter<C extends FilterCondition> {
    List<FilterDto> filter(List<FilterDto> candidates, C condition);
}