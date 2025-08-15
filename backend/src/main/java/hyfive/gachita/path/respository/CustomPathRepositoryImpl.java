package hyfive.gachita.path.respository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.dispatch.module.filter.condition.PathCondition;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static hyfive.gachita.car.QCar.car;
import static hyfive.gachita.path.domain.QPath.path;

@RequiredArgsConstructor
public class CustomPathRepositoryImpl implements CustomPathRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Long> searchPathList(PathCondition condition) {
        return queryFactory
                .select(path.id)
                .from(path)
                .where(
                        path.maybeStartTime.loe(condition.maybeOnTime()),
                        path.maybeEndTime.goe(condition.deadline())
                )
                .join(path.car, car)
                .where(
                        car.lowFloor.eq(condition.walker()),
                        car.capacity.gt(path.userCount)
                )
                .fetch();
    }
}
