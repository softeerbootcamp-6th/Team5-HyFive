package hyfive.gachita.rental.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.rental.Rental;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static hyfive.gachita.rental.QRental.rental;

@Repository
@RequiredArgsConstructor
public class CustomRentalRepositoryImpl implements CustomRentalRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public void deleteRentalsBetween(Long carId, LocalDate startDate, LocalDate endDate) {
        queryFactory
                .delete(rental)
                .where(
                        rental.car.id.eq(carId)
                                .and(rental.rentalDate.between(startDate, endDate))
                )
                .execute();
    }

    @Override
    public List<Rental> findRentalsBetween(Long carId, LocalDate startDate, LocalDate endDate) {
        return queryFactory
                .selectFrom(rental)
                .where(
                        rental.car.id.eq(carId)
                                .and(rental.rentalDate.between(startDate, endDate))
                )
                .fetch();
    }
}