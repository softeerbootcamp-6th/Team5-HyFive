package hyfive.gachita.rental.repository;

import hyfive.gachita.rental.dto.RentalRes;

import java.time.LocalDate;
import java.util.List;

public interface CustomRentalRepository {

    void deleteRentalsBetween(Long carId, LocalDate startDate, LocalDate endDate);

    List<RentalRes> findRentalsBetween(Long carId, LocalDate startDate, LocalDate endDate);
}
