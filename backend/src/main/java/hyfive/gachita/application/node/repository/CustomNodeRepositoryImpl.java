package hyfive.gachita.application.node.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.application.path.dto.MarkerDto;
import hyfive.gachita.application.path.dto.SegmentDto;
import hyfive.gachita.client.geocode.dto.LatLng;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import static hyfive.gachita.application.node.QNode.node;
import static hyfive.gachita.application.node.QPoint.point;
import static hyfive.gachita.application.node.QSegment.segment;

@RequiredArgsConstructor
public class CustomNodeRepositoryImpl implements CustomNodeRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<MarkerDto> findByAllPathId(Long pathId) {
        return queryFactory
                .select(
                        Projections.constructor(
                                MarkerDto.class,
                                node.id,
                                node.book.id,
                                Projections.constructor(
                                        LatLng.class,
                                        node.lat,
                                        node.lng
                                ),
                                node.time,
                                node.type
                        )
                )
                .from(node)
                .where(node.path.id.eq(pathId))
                .orderBy(node.time.asc())
                .fetch();
    }

    @Override
    public List<SegmentDto> findSegmentsByMarkers(List<MarkerDto> markers) {
        List<SegmentDto> result = new ArrayList<>();

        IntStream.range(0, markers.size() - 1).forEach(i -> {
            Long startNodeId = markers.get(i).nodeId();
            Long endNodeId = markers.get(i + 1).nodeId();

            SegmentDto dto = queryFactory
                    .select(
                            Projections.constructor(
                                    SegmentDto.class,
                                    segment.sequence,
                                    Projections.list(
                                            Projections.constructor(
                                                    hyfive.gachita.client.geocode.dto.LatLng.class,
                                                    point.lat,
                                                    point.lng
                                            )
                                    )
                            )
                    )
                    .from(segment)
                    .join(segment.points, point)
                    .where(segment.startNode.id.eq(startNodeId)
                            .and(segment.endNode.id.eq(endNodeId)))
                    .fetchOne();

            if (dto != null) {
                result.add(dto);
            }
        });

        return result;
    }
}
