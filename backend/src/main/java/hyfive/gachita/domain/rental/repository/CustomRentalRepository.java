package hyfive.gachita.domain.rental.repository;

import hyfive.gachita.domain.rental.Rental;

import java.time.LocalDate;
import java.util.List;

public interface CustomRentalRepository {

    void deleteRentalsBetween(Long carId, LocalDate startDate, LocalDate endDate);

    List<Rental> findRentalsBetween(Long carId, LocalDate startDate, LocalDate endDate);
}
