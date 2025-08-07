package hyfive.gachita.car.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanTemplate;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.car.DelYn;
import hyfive.gachita.car.dto.CarListRes;
import hyfive.gachita.path.DriveStatus;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;

import static hyfive.gachita.car.QCar.car;
import static hyfive.gachita.path.QPath.path;

@RequiredArgsConstructor
public class CustomCarRepositoryImpl implements CustomCarRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<CarListRes> searchCarListByCondition(Long centerId) {
        LocalDate today = LocalDate.now();

        List<Long> carIds = queryFactory
                .select(car.id)
                .from(car)
                .where(
                        car.center.id.eq(centerId),
                        car.delYn.eq(DelYn.N)
                )
                .orderBy(car.createdAt.asc())
                .fetch();

        if (carIds.isEmpty()) {
            return Collections.emptyList();
        }

        BooleanTemplate runningExpr = Expressions.booleanTemplate(
                "sum(case when {0} = {1} then 1 else 0 end) > 0",
                path.driveStatus,
                DriveStatus.RUNNING
        );

        List<Tuple> carList = queryFactory
                .select(car, runningExpr)
                .from(car)
                .leftJoin(path).on(
                        path.car.id.eq(car.id)
                                .and(path.driveDate.eq(today))
                )
                .where(car.id.in(carIds))
                .groupBy(car.id)
                .orderBy(car.createdAt.asc())
                .fetch();

        return carList.stream()
                .map(tuple -> CarListRes.from(
                        tuple.get(car),
                        tuple.get(runningExpr)
                ))
                .toList();
    }
}
