package hyfive.gachita.domain.car.repository;

import hyfive.gachita.domain.car.Car;
import hyfive.gachita.domain.car.DelYn;
import hyfive.gachita.domain.center.Center;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Long>, CustomCarRepository {

    long countByCenterAndDelYn(Center center, DelYn delYn);

    boolean existsByCarNumberAndDelYn(String carNumber, DelYn delYn);

    boolean existsByIdNotAndCarNumberAndDelYn(Long id, String carNumber, DelYn delYn);

}
