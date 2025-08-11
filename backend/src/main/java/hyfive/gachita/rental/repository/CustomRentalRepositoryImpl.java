package hyfive.gachita.rental.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

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
}