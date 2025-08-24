package hyfive.gachita.application.rental.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.application.rental.Rental;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static hyfive.gachita.application.rental.QAvailableRental.availableRental;
import static hyfive.gachita.application.rental.QRental.rental;

@Repository
@RequiredArgsConstructor
public class CustomRentalRepositoryImpl implements CustomRentalRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    @Transactional
    public void deleteRentalsBetween(Long carId, LocalDate startDate, LocalDate endDate) {
        queryFactory
                .delete(availableRental)
                .where(availableRental.rental.car.id.eq(carId)
                        .and(availableRental.rental.rentalDate.between(startDate, endDate)))
                .execute();

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