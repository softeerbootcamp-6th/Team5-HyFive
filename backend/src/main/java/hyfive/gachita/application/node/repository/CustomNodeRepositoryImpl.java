package hyfive.gachita.application.node.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.application.node.NodeType;
import hyfive.gachita.application.node.QNode;
import hyfive.gachita.application.node.QSegment;
import hyfive.gachita.application.node.dto.HighlightDto;
import hyfive.gachita.application.node.dto.SegmentDto;
import hyfive.gachita.application.path.dto.HighlightRes;
import hyfive.gachita.application.path.dto.MarkerRes;
import hyfive.gachita.client.geocode.dto.LatLng;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import static hyfive.gachita.application.node.QNode.node;
import static hyfive.gachita.application.node.QPoint.point;
import static hyfive.gachita.application.node.QSegment.segment;

@Slf4j
@RequiredArgsConstructor
public class CustomNodeRepositoryImpl implements CustomNodeRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<MarkerRes> findByAllPathId(Long pathId) {
        return queryFactory
                .select(
                        Projections.constructor(
                                MarkerRes.class,
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
    public List<SegmentDto> findSegmentsByMarkers(List<MarkerRes> markers) {
        List<SegmentDto> result = new ArrayList<>();

        IntStream.range(0, markers.size() - 1).forEach(i -> {
            Long startNodeId = markers.get(i).nodeId();
            Long endNodeId = markers.get(i + 1).nodeId();

            // segment와 point 조인
            List<Tuple> rows = queryFactory
                    .select(
                            segment.startNode.id,
                            segment.endNode.id,
                            segment.sequence,
                            point.lat,
                            point.lng
                    )
                    .from(segment)
                    .join(segment.points, point)
                    .where(segment.startNode.id.eq(startNodeId)
                            .and(segment.endNode.id.eq(endNodeId)))
                    .fetch();

            if (!rows.isEmpty()) {
                Long sId = rows.get(0).get(segment.startNode.id);
                Long eId = rows.get(0).get(segment.endNode.id);
                int sequence = rows.get(0).get(segment.sequence);

                List<LatLng> points = rows.stream()
                        .map(r -> new LatLng(
                                r.get(point.lat),
                                r.get(point.lng)
                        ))
                        .toList();

                result.add(new SegmentDto(sId, eId, sequence, points));
            }
        });

        return result;
    }


    public List<HighlightRes> getHighlightsByPath(Long pathId) {
        QNode startNode = new QNode("startNode");
        QNode endNode   = new QNode("endNode");
        QSegment sStart = new QSegment("sStart");
        QSegment sEnd   = new QSegment("sEnd");

        log.debug("QueryDSL HighlightRes 조회 시작, pathId={}", pathId);

        // highlight dto 추출 (bookId, start 좌표, end 좌표, startSeq, endSeq)
        List<HighlightDto> highlights = queryFactory
                .select(Projections.constructor(
                        HighlightDto.class,
                        startNode.book.id,
                        startNode.lat, startNode.lng,
                        endNode.lat, endNode.lng,
                        sStart.sequence,                   // startSeq: startNode를 시작으로 하는 세그먼트의 sequence
                        sEnd.sequence                      // endSeq  : endNode로 끝나는 세그먼트의 sequence
                ))
                .from(startNode)
                .join(sStart).on(sStart.startNode.eq(startNode))
                .join(endNode).on(
                        endNode.path.id.eq(startNode.path.id)
                                .and(endNode.book.id.eq(startNode.book.id))
                                .and(endNode.type.eq(NodeType.END))
                )
                .join(sEnd).on(sEnd.endNode.eq(endNode))
                .where(
                        startNode.path.id.eq(pathId)
                                .and(startNode.type.eq(NodeType.START))
                )
                .fetch();

        log.debug("시드 개수(highlights) = {}", highlights.size());

        // 2) 자바에서 HighlightRes로 변환
        List<HighlightRes> result = new ArrayList<>(highlights.size());
        for (HighlightDto h : highlights) {

            int startSeq = h.startSeq();
            int endSeq   = h.endSeq();

            // 연속 시퀀스 : startSeq..endSeq 범위 채우기
            int[] segmentSeqs = IntStream.rangeClosed(startSeq, endSeq).toArray();

            HighlightRes highlight = HighlightRes.builder()
                    .bookId(h.bookId())
                    .start(new LatLng(h.startLat(), h.startLng()))
                    .end(new LatLng(h.endLat(), h.endLng()))
                    .segmentList(segmentSeqs)
                    .build();

            log.debug("bookId={} => startSeq={}, endSeq={}, segmentList(length)={}",
                    h.bookId(), startSeq, endSeq, segmentSeqs.length);

            result.add(highlight);
        }

        log.debug("HighlightRes 생성 완료, 총 {}개", result.size());
        return result;
    }
}
