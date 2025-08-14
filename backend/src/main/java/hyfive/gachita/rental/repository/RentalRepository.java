package hyfive.gachita.rental.repository;

import hyfive.gachita.rental.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepository extends JpaRepository<Rental, Long>, CustomRentalRepository {
}
