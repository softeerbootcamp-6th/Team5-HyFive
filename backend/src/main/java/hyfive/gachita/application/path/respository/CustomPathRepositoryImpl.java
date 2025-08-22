package hyfive.gachita.application.path.respository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.application.car.DelYn;
import hyfive.gachita.application.node.Node;
import hyfive.gachita.application.path.DriveStatus;
import hyfive.gachita.application.path.Path;
import hyfive.gachita.application.path.QPath;
import hyfive.gachita.application.path.dto.NodeWithDeadline;
import hyfive.gachita.application.path.dto.PathCursor;
import hyfive.gachita.dispatch.dto.OldPathDto;
import hyfive.gachita.dispatch.module.condition.PathCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static hyfive.gachita.application.book.QBook.book;
import static hyfive.gachita.application.car.QCar.car;
import static hyfive.gachita.application.center.QCenter.center;
import static hyfive.gachita.application.node.QNode.node;
import static hyfive.gachita.application.node.QSegment.segment;
import static hyfive.gachita.application.path.QPath.path;

@Repository
@RequiredArgsConstructor
public class CustomPathRepositoryImpl implements CustomPathRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<OldPathDto> searchPathList(PathCondition condition) {
        List<Tuple> pathList = queryFactory
                .select(
                        path.id,
                        car.id,
                        node,
                        node.book.deadline
                )
                .from(path)
                .join(path.car, car)
                .on(
                        (condition.walker() ? car.lowFloor.isTrue() : Expressions.TRUE.isTrue()),
                        car.capacity.gt(path.userCount),
                        car.delYn.eq(DelYn.N)
                )
                .join(path.nodeList, node)
                .where(
                        path.maybeStartTime.loe(condition.maybeOnTime()),
                        path.maybeEndTime.goe(condition.deadline()),
                        path.id.in(condition.pathIds())
                )
                .fetch();

        return pathList.stream()
                .collect(Collectors.groupingBy(tuple -> tuple.get(path.id)))
                .values().stream()
                .map(tuplesForOnePath -> {
                    Tuple firstTuple = tuplesForOnePath.get(0);
                    Long pathId = firstTuple.get(path.id);
                    Long carId = firstTuple.get(car.id);

                    List<NodeWithDeadline> nodes = tuplesForOnePath.stream()
                            .map(tuple -> new NodeWithDeadline(
                                    tuple.get(node),
                                    tuple.get(node.book.deadline)
                            ))
                            .toList();

                    return OldPathDto.from(pathId, carId, nodes);
                })
                .toList();
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

    @Override
    public Path findPassengersByPathId(Long pathId) {
        return queryFactory.select(path)
                .from(path)
                .leftJoin(path.bookList, book)
                .leftJoin(book.nodeList, node)
                .where(path.id.eq(pathId))
                .fetchOne();
    }

    @Override
    public Page<Path> searchPathPageByCondition(Pair<LocalDate, LocalDate> dateRange,
                                                DriveStatus status,
                                                Pageable pageable) {
        List<Path> pathList = queryFactory
                .select(path)
                .from(path)
                .where(
                        path.driveDate.between(dateRange.getFirst(), dateRange.getSecond()),
                        statusEq(path, status)
                )
                .orderBy(
                    path.realStartTime.asc(),
                    path.realEndTime.asc(),
                    path.id.desc()
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long totalCount = queryFactory
                .select(Wildcard.count)
                .from(path)
                .where(
                        path.driveDate.between(dateRange.getFirst(), dateRange.getSecond()),
                        statusEq(path, status)
                )
                .fetchOne();

        return new PageImpl<>(pathList, pageable, totalCount == null ? 0L : totalCount);
    }

    @Override
    public Optional<List<Node>> findNodeListWithSegmentInfoByPathId(Long id) {
        return Optional.ofNullable(queryFactory
                .selectFrom(node)
                .leftJoin(node.book, book).fetchJoin()
                .leftJoin(node.leftSegment, segment).fetchJoin()
                .where(node.path.id.eq(id))
                .orderBy(node.time.asc())
                .fetch());
    }

    @Override
    public List<Node> findNodeListByPathId(Long id) {
        return queryFactory
                .selectFrom(node)
                .leftJoin(node.leftSegment, segment).fetchJoin()
                .where(node.path.id.eq(id))
                .orderBy(node.time.asc())
                .fetch();
    }

    @Override
    public List<Path> findAllByDriveDate(LocalDate today) {
        return queryFactory
                .selectFrom(path)
                .where(
                        path.driveDate.eq(today),
                        path.driveStatus.eq(DriveStatus.WAITING)
                )
                .orderBy(path.realStartTime.asc(), path.realEndTime.asc(), path.id.desc())
                .fetch();
    }

    private BooleanExpression statusEq(QPath path, DriveStatus status) {
        return status != null ? path.driveStatus.eq(status) : null;
    }
}
