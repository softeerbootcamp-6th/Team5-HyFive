package hyfive.gachita.domain.rental.repository;

import hyfive.gachita.domain.rental.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepository extends JpaRepository<Rental, Long>, CustomRentalRepository {
}
