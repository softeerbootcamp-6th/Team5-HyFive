package hyfive.gachita.path.respository;

import hyfive.gachita.path.domain.Path;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PathRepository extends JpaRepository<Path, Long>, CustomPathRepository {
}
