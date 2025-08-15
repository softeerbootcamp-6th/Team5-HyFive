package hyfive.gachita.domain.center.repository;

import hyfive.gachita.domain.center.dto.CenterListRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomCenterRepository {
    Page<CenterListRes> searchCenterListWithCarCounts(Pageable pageable);
}
