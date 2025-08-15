package hyfive.gachita.path.respository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalTime;
import java.util.List;

import static hyfive.gachita.car.QCar.car;
import static hyfive.gachita.path.domain.QPath.path;

@RequiredArgsConstructor
public class CustomPathRepositoryImpl implements CustomPathRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Long> getAll(LocalTime maybeOnTime, LocalTime deadline, boolean walker) {
        return queryFactory
                .select(path.id)
                .from(path)
                .where(
                        path.maybeStartTime.loe(maybeOnTime),
                        path.maybeEndTime.goe(deadline)
                )
                .join(path.car, car)
                .where(
                        car.lowFloor.eq(walker),
                        car.capacity.gt(path.userCount)
                )
                .fetch();
    }
}
