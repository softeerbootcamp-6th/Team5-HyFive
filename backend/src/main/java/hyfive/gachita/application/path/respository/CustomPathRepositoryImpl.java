package hyfive.gachita.application.path.respository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.application.car.DelYn;
import hyfive.gachita.dispatch.dto.OldPathDto;
import hyfive.gachita.dispatch.module.condition.PathCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.types.Projections.list;
import static hyfive.gachita.application.car.QCar.car;
import static hyfive.gachita.application.node.QNode.node;
import static hyfive.gachita.application.path.QPath.path;

@Repository
@RequiredArgsConstructor
public class CustomPathRepositoryImpl implements CustomPathRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<OldPathDto> searchPathList(PathCondition condition) {
        return queryFactory
                .from(path)
                .join(path.car, car)
                .on(
                        car.lowFloor.eq(condition.walker()),
                        car.capacity.gt(path.userCount),
                        car.delYn.eq(DelYn.N)
                )
                .join(path.nodeList, node)
                .where(
                        path.maybeStartTime.loe(condition.maybeOnTime()),
                        path.maybeEndTime.goe(condition.deadline()),
                        path.id.in(condition.pathIds())
                )
                .transform(
                        groupBy(path.id).list(
                                Projections.constructor(
                                        OldPathDto.class,
                                        path.id,
                                        car.id,
                                        list(node)
                                )
                        )
                );
    }
}
