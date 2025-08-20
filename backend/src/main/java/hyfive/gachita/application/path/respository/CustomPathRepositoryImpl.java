package hyfive.gachita.application.path.respository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.application.car.DelYn;
import hyfive.gachita.application.path.DriveStatus;
import hyfive.gachita.application.path.Path;
import hyfive.gachita.application.path.dto.PathCursor;
import hyfive.gachita.application.path.dto.PathRes;
import hyfive.gachita.dispatch.dto.OldPathDto;
import hyfive.gachita.dispatch.module.condition.PathCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.types.Projections.list;
import static hyfive.gachita.application.book.QBook.book;
import static hyfive.gachita.application.car.QCar.car;
import static hyfive.gachita.application.center.QCenter.center;
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

    @Override
    public Optional<PathRes> findPathResByBookId(Long bookId) {
        return Optional.ofNullable(queryFactory
                .select(Projections.constructor(PathRes.class,
                        path.id,
                        car.carNumber,
                        path.realStartTime,
                        path.realEndTime,
                        path.startAddr,
                        path.endAddr
                ))
                .from(book)
                .leftJoin(book.path, path)
                .leftJoin(path.car, car)
                .where(book.id.eq(bookId))
                .fetchOne()
        );
    }

    @Override
    public List<Path> findPathsForScroll(LocalDate date, DriveStatus status, PathCursor cursor, int size) {

        BooleanBuilder cursorCondition = new BooleanBuilder();
        if (cursor != null && cursor.lastId() != null && cursor.lastStartTime() != null && cursor.lastEndTime() != null) {
            // startTime 비교
            cursorCondition.or(path.realStartTime.gt(cursor.lastStartTime()));

            // startTime 같을 때 endTime 비교
            cursorCondition.or(
                    path.realStartTime.eq(cursor.lastStartTime())
                            .and(path.realEndTime.gt(cursor.lastEndTime()))
            );

            // startTime, endTime 모두 같을 때 id 비교
            cursorCondition.or(
                    path.realStartTime.eq(cursor.lastStartTime())
                            .and(path.realEndTime.eq(cursor.lastEndTime()))
                            .and(path.id.lt(cursor.lastId()))
            );
        }




        return queryFactory.select(path)
                .from(path)
                .join(path.car, car)
                .join(car.center, center)
                .where(
                        path.driveStatus.eq(status),
                        path.driveDate.eq(date),
                        cursorCondition
                )
                .orderBy(
                        path.realStartTime.asc(),
                        path.realEndTime.asc(),
                        path.id.desc()
                )
                .limit(size + 1)
                .fetch();
    }
}

