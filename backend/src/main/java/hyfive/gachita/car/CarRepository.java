package hyfive.gachita.car;

import hyfive.gachita.center.Center;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Long> {

    long countByCenterAndDelYn(Center center, DelYn delYn);

    boolean existsByCarNumberAndDelYn(String carNumber, DelYn delYn);

}
