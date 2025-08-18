package hyfive.gachita.application.car.repository;

import hyfive.gachita.application.car.Car;
import hyfive.gachita.application.car.DelYn;
import hyfive.gachita.application.center.Center;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Long>, CustomCarRepository {

    long countByCenterAndDelYn(Center center, DelYn delYn);

    boolean existsByCarNumberAndDelYn(String carNumber, DelYn delYn);

    boolean existsByIdNotAndCarNumberAndDelYn(Long id, String carNumber, DelYn delYn);

}
