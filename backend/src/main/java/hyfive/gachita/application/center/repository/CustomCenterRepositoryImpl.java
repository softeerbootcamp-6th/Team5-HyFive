package hyfive.gachita.application.center.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.application.car.DelYn;
import hyfive.gachita.application.center.dto.CenterListRes;
import hyfive.gachita.dispatch.dto.IdleCarDto;
import hyfive.gachita.dispatch.dto.IdleTimeDto;
import hyfive.gachita.dispatch.module.condition.CenterCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static hyfive.gachita.application.car.QCar.car;
import static hyfive.gachita.application.center.QCenter.center;
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

    public List<IdleCarDto> searchCarListWithCenter(CenterCondition condition) {
        List<IdleTimeDto> result = queryFactory
                .select(Projections.constructor(IdleTimeDto.class,
                            center.id,
                            center.lat,
                            center.lng,
                            car.id,
                            car.capacity,
                            rental.rentalStartTime,
                            rental.rentalEndTime
                ))
                .from(center)
                .join(center.carList, car)
                .where(
                        center.id.in(condition.centerIdList()),
                        car.lowFloor.eq(condition.walker()),
                        car.delYn.eq(DelYn.N)
                )
                .leftJoin(rental)
                .on(
                        rental.car.id.eq(car.id)
                                .and(rental.pathList.isEmpty()) // 배차 여부 확인
                                .and(rental.rentalDate.eq(condition.hospitalDate()))
                                .and(rental.rentalStartTime.loe(condition.maybeOnTime()))
                                .and(rental.rentalEndTime.goe(condition.deadline()))
                )
                .fetch();
        return List.of();
    }

    private NumberExpression<Long> getLowCarCount() {
        return new CaseBuilder()
                .when(car.lowFloor.eq(true))
                .then(1L)
                .otherwise((Long) null)
                .count();
    }
}
