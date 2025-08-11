package hyfive.gachita.center.repository;

import hyfive.gachita.center.dto.CenterListRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomCenterRepository {
    Page<CenterListRes> searchCenterListWithCarCounts(Pageable pageable);
}
