package hyfive.gachita.center.repository;

import hyfive.gachita.center.Center;
import hyfive.gachita.center.dto.CenterListRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CenterRepository extends JpaRepository<Center, Long>, CustomCenterRepository {
}

