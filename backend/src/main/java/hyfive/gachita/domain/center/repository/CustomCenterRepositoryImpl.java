package hyfive.gachita.domain.center.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.domain.car.DelYn;
import hyfive.gachita.domain.center.dto.CenterListRes;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static hyfive.gachita.car.QCar.car;
import static hyfive.gachita.center.QCenter.center;

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

    private static NumberExpression<Long> getLowCarCount() {
        return new CaseBuilder()
                .when(car.lowFloor.eq(true))
                .then(1L)
                .otherwise((Long) null)
                .count();
    }
}
