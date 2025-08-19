package hyfive.gachita.application.center.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.application.car.DelYn;
import hyfive.gachita.application.center.dto.CenterListRes;
import hyfive.gachita.dispatch.dto.CarScheduleDto;
import hyfive.gachita.dispatch.dto.FilteredCenterDto;
import hyfive.gachita.dispatch.module.condition.CenterCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static hyfive.gachita.application.car.QCar.car;
import static hyfive.gachita.application.center.QCenter.center;
import static hyfive.gachita.application.path.QPath.path;
import static hyfive.gachita.application.rental.QRental.rental;

@RequiredArgsConstructor
public class CustomCenterRepositoryImpl implements CustomCenterRepository{

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<CenterListRes> searchCenterListWithCarCounts(Pageable pageable) {

        List<CenterListRes> centerList = queryFactory
                .select(Projections.constructor(CenterListRes.class,
                        center.id.as("centerId"),
                        center.centerName,
                        center.centerAddr,
                        center.centerTel,
                        car.id.countDistinct().as("carCount"),
                        getLowCarCount().as("lowCarCount")
                ))
                .from(center)
                .leftJoin(center.carList, car)
                .on(car.delYn.eq(DelYn.N))
                .groupBy(center.id)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = queryFactory
                .select(center.count())
                .from(center)
                .fetchOne();

        return new PageImpl<>(centerList, pageable, total == null ? 0L : total);
    }

    public List<CarScheduleDto> searchCarListWithCenter(CenterCondition condition) {
        return queryFactory
                .select(Projections.constructor(
                        CarScheduleDto.class,
                        Projections.constructor(
                                FilteredCenterDto.class,
                                center.id,
                                center.lat,
                                center.lng
                        ),
                        car.id,
                        car.capacity,
                        rental.id,
                        rental.rentalStartTime,
                        rental.rentalEndTime
                ))
                .from(center)
                .join(center.carList, car)
                .where(
                        car.lowFloor.eq(condition.walker()),
                        car.delYn.eq(DelYn.N)
                )
                .leftJoin(rental)
                .on(
                        rental.car.id.eq(car.id)
                                .and(
                                        JPAExpressions
                                                .selectOne()
                                                .from(path)
                                                .where(path.rental.eq(rental))
                                                .notExists()
                                )
                                .and(rental.rentalDate.eq(condition.hospitalDate()))
                                .and(rental.rentalStartTime.loe(condition.maybeOnTime()))
                                .and(rental.rentalEndTime.goe(condition.deadline()))
                )
                .fetch();
    }

    private NumberExpression<Long> getLowCarCount() {
        return new CaseBuilder()
                .when(car.lowFloor.eq(true))
                .then(1L)
                .otherwise((Long) null)
                .count();
    }
}
