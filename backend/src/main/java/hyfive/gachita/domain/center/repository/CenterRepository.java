package hyfive.gachita.domain.center.repository;

import hyfive.gachita.domain.center.Center;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CenterRepository extends JpaRepository<Center, Long>, CustomCenterRepository {
}

