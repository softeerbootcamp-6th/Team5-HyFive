package hyfive.gachita.application.node.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.application.node.NodeType;
import hyfive.gachita.application.node.QNode;
import hyfive.gachita.application.node.QSegment;
import hyfive.gachita.application.node.dto.HighlightDto;
import hyfive.gachita.application.node.dto.NodePair;
import hyfive.gachita.application.path.dto.HighlightRes;
import hyfive.gachita.application.path.dto.MarkerRes;
import hyfive.gachita.application.path.dto.SegmentRes;
import hyfive.gachita.client.geocode.dto.LatLng;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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
    public List<SegmentRes> findSegmentsByMarkers(List<MarkerRes> markers) {
        // (startNodeId, endNodeId) 쌍 추출
        List<NodePair> nodePairs = IntStream.range(0, markers.size() - 1)
                .mapToObj(i -> new NodePair(markers.get(i).nodeId(), markers.get(i + 1).nodeId()))
                .toList();

        // where 조건: (startNodeId = ? and endNodeId = ?) OR ...
        BooleanBuilder condition = new BooleanBuilder();
        nodePairs.forEach(pair -> condition.or(
                segment.startNode.id.eq(pair.startId())
                        .and(segment.endNode.id.eq(pair.endId()))
        ));

        // 한 번의 쿼리로 전체 데이터 조회
        List<Tuple> rows = queryFactory
                .select(
                        segment.sequence,
                        segment.startNode.id,
                        segment.endNode.id,
                        point.lat,
                        point.lng
                )
                .from(segment)
                .join(segment.points, point)
                .where(condition)
                .orderBy(segment.sequence.asc(), point.id.asc()) // 순서 보장
                .fetch();

        // (startNodeId, endNodeId) → SegmentRes 맵핑
        Map<String, List<Tuple>> grouped = rows.stream()
                .collect(Collectors.groupingBy(r ->
                        r.get(segment.startNode.id) + "-" + r.get(segment.endNode.id)));

        // 결과 조립
        List<SegmentRes> result = new ArrayList<>();
        for (NodePair pair : nodePairs) {
            List<Tuple> group = grouped.getOrDefault(pair.key(), Collections.emptyList());

            if (!group.isEmpty()) {
                int sequence = group.get(0).get(segment.sequence);
                List<LatLng> points = group.stream()
                        .map(r -> new LatLng(r.get(point.lat), r.get(point.lng)))
                        .toList();

                result.add(new SegmentRes(sequence, points));
            }
        }

        return result;
    }

    public List<HighlightRes> getHighlightsByPath(Long pathId) {
        QNode startNode = new QNode("startNode");
        QNode endNode   = new QNode("endNode");
        QSegment startSegment = new QSegment("startSegment");
        QSegment endSegment   = new QSegment("endSegment");

        log.debug("QueryDSL HighlightRes 조회 시작, pathId={}", pathId);

        // highlight dto 추출 (bookId, start 좌표, end 좌표, startSeq, endSeq)
        List<HighlightDto> highlights = queryFactory
                .select(Projections.constructor(
                        HighlightDto.class,
                        startNode.book.id,
                        startNode.lat, startNode.lng,
                        endNode.lat, endNode.lng,
                        startSegment.sequence,                   // startSeq: startNode를 시작으로 하는 세그먼트의 sequence
                        endSegment.sequence                      // endSeq  : endNode로 끝나는 세그먼트의 sequence
                ))
                .from(startNode)
                .join(startSegment).on(startSegment.startNode.eq(startNode))
                .join(endNode).on(
                        endNode.path.id.eq(startNode.path.id)
                                .and(endNode.book.id.eq(startNode.book.id))
                                .and(endNode.type.eq(NodeType.END))
                )
                .join(endSegment).on(endSegment.endNode.eq(endNode))
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
