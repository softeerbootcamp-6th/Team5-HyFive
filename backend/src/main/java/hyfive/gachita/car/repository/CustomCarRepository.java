package hyfive.gachita.car.repository;

import hyfive.gachita.car.dto.CarListRes;

import java.util.List;

public interface CustomCarRepository {
    List<CarListRes> searchCarListByCondition(Long centerId);
}
