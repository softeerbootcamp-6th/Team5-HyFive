package hyfive.gachita.rental.repository;

import java.time.LocalDate;

public interface CustomRentalRepository {

    void deleteRentalsBetween(Long carId, LocalDate startDate, LocalDate endDate);
}
