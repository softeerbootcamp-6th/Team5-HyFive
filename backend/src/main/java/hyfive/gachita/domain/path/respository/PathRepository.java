package hyfive.gachita.domain.path.respository;

import hyfive.gachita.domain.path.domain.Path;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PathRepository extends JpaRepository<Path, Long>, CustomPathRepository {
}
