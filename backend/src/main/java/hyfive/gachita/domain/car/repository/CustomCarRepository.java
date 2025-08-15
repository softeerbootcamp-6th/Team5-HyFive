package hyfive.gachita.domain.car.repository;

import hyfive.gachita.domain.car.dto.CarListRes;

import java.util.List;

public interface CustomCarRepository {
    List<CarListRes> searchCarListByCondition(Long centerId);
}
