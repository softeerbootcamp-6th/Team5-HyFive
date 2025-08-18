package hyfive.gachita.application.center.repository;

import hyfive.gachita.application.center.Center;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CenterRepository extends JpaRepository<Center, Long>, CustomCenterRepository {
}

