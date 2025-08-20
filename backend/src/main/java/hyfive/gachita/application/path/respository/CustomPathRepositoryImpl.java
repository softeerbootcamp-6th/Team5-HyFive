package hyfive.gachita.application.path.respository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.application.path.dto.PathRes;
import hyfive.gachita.application.path.dto.QPathRes;
import hyfive.gachita.dispatch.dto.NodeDispatchLocationDto;
import hyfive.gachita.dispatch.dto.PathDispatchDto;
import hyfive.gachita.dispatch.module.condition.PathCondition;
import hyfive.gachita.application.node.Node;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static hyfive.gachita.application.car.QCar.car;
import static hyfive.gachita.application.node.QNode.node;
import static hyfive.gachita.application.path.QPath.path;
import static hyfive.gachita.application.book.QBook.book;

import static java.util.stream.Collectors.*;

@Repository
@RequiredArgsConstructor
public class CustomPathRepositoryImpl implements CustomPathRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<PathDispatchDto> searchPathList(PathCondition condition) {
        List<Tuple> result = queryFactory
                .select(path.id, node)
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
                .join(path.nodeList, node)
                .fetch();

        Map<Long, List<Node>> pathNodeMap = converToMap(result);

        return pathNodeMap.entrySet().stream()
                .map(entry -> {
                    Long pathId = entry.getKey();
                    List<Node> nodeList = entry.getValue();

                    return createPathDto(pathId, nodeList);
                })
                .toList();
    }

    @Override
    public Optional<PathRes> findPathResByBookId(Long bookId) {
        return Optional.ofNullable(queryFactory
                .select(new QPathRes(
                        path.id,
                        car.carNumber,
                        path.realStartTime,
                        path.realEndTime,
                        path.startAddr,
                        path.endAddr
                ))
                .from(book)
                .leftjoin(book.path, path)
                .leftjoin(path.car, car)
                .where(book.id.eq(bookId))
                .fetchOne()
        );
    }

    private Map<Long, List<Node>> converToMap(List<Tuple> result) {
        return result.stream()
            .collect(groupingBy(
                    t -> t.get(path.id),
                    mapping(t -> t.get(node), toList())
            ));
    }

    private PathDispatchDto createPathDto(Long pathId, List<Node> nodeList) {
        List<NodeDispatchLocationDto> nodeDtoList = nodeList.stream()
                .map(this::createNodeDto)
                .toList();

        return PathDispatchDto.builder()
                .pathId(pathId)
                .nodes(nodeDtoList)
                .build();
    }

    private NodeDispatchLocationDto createNodeDto(Node nodeEntity) {
        return NodeDispatchLocationDto.builder()
                .nodeId(nodeEntity.getId())
                .lat(nodeEntity.getLat())
                .lng(nodeEntity.getLng())
                .time(nodeEntity.getTime())
                .type(nodeEntity.getType())
                .build();
    }
}
