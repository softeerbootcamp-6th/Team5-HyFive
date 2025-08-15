package hyfive.gachita.application.rental.repository;

import hyfive.gachita.application.rental.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepository extends JpaRepository<Rental, Long>, CustomRentalRepository {
}
