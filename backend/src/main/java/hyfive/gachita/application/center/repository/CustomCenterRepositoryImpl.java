package hyfive.gachita.application.center.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.application.car.DelYn;
import hyfive.gachita.application.center.dto.CenterListRes;
import hyfive.gachita.dispatch.dto.IdleCarDto;
import hyfive.gachita.dispatch.module.condition.CenterCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static hyfive.gachita.application.car.QCar.car;
import static hyfive.gachita.application.center.QCenter.center;

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

    @Override
    public List<IdleCarDto> searchCarListWithCenter(CenterCondition condition) {
        // TODO: 배차 되어있는 유휴시간인지 판단하는 로직 추가 필요
//        return queryFactory
//                .select(Projections.constructor(IdleCarDto.class,
//                        center.id,
//                        center.lat,
//                        center.lng,
//                        car.id
//                ))
//                .where(
//                        center.id.in(condition.centerIdList())
//                )
//                .from(center)
//                .join(center.carList, car)
//                .where(
//                        car.lowFloor.eq(condition.walker()),
//                        car.delYn.eq(DelYn.N)
//                )
//                .leftJoin(rental)
//                .on(
//                        rental.car.id.eq(car.id),
//                        rental.rentalDate.eq(condition.hospitalDate()),
//                        rental.rentalStartTime.loe(condition.maybeOnTime()),
//                        rental.rentalEndTime.goe(condition.deadline())
//                )
//                .fetch();
        return List.of();
    }

    private static NumberExpression<Long> getLowCarCount() {
        return new CaseBuilder()
                .when(car.lowFloor.eq(true))
                .then(1L)
                .otherwise((Long) null)
                .count();
    }
}
