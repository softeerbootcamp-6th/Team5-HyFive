package hyfive.gachita.application.node.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.application.path.dto.MarkerDto;
import hyfive.gachita.client.geocode.dto.LatLng;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static hyfive.gachita.application.node.QNode.node;

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
}
