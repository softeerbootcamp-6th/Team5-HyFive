package hyfive.gachita.application.center.repository;

import hyfive.gachita.application.center.dto.CenterListRes;
import hyfive.gachita.dispatch.dto.CarScheduleDto;
import hyfive.gachita.dispatch.module.condition.CenterCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomCenterRepository {
    Page<CenterListRes> searchCenterListWithCarCounts(Pageable pageable);

    List<CarScheduleDto> searchCarListWithCenter(CenterCondition condition);
}
