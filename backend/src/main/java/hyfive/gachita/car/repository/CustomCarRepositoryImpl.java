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
import java.util.List;

import static hyfive.gachita.car.QCar.car;
import static hyfive.gachita.path.domain.QPath.path;

@RequiredArgsConstructor
public class CustomCarRepositoryImpl implements CustomCarRepository {

    private final JPAQueryFactory queryFactory;


    @Override
    public List<CarListRes> searchCarListByCondition(Long centerId) {
        LocalDate today = LocalDate.now();

        BooleanTemplate drivingExpr = Expressions.booleanTemplate(
                "sum(case when {0} = {1} then 1 else 0 end) > 0",
                path.driveStatus,
                DriveStatus.RUNNING
        );

        List<Tuple> carList = queryFactory
                .select(car, drivingExpr)
                .from(car)
                .leftJoin(path).on(
                        path.car.eq(car)
                                .and(path.driveDate.eq(today))
                )
                .where(
                        car.center.id.eq(centerId),
                        car.delYn.eq(DelYn.N)
                )
                .groupBy(car.id)
                .orderBy(car.createdAt.asc())
                .fetch();

        return carList.stream()
        .map(tuple -> CarListRes.from(
                tuple.get(car),
                tuple.get(drivingExpr)
        ))
        .toList();
    }
}
