package hyfive.gachita.application.car.repository;

import hyfive.gachita.application.car.dto.CarListRes;

import java.util.List;

public interface CustomCarRepository {
    List<CarListRes> searchCarListByCondition(Long centerId);
}
