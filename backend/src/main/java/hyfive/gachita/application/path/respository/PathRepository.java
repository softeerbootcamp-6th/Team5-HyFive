package hyfive.gachita.application.path.respository;

import hyfive.gachita.application.path.Path;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PathRepository extends JpaRepository<Path, Long>, CustomPathRepository {
}
