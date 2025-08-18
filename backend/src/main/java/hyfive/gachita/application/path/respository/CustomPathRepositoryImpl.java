package hyfive.gachita.application.path.respository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import hyfive.gachita.dispatch.dto.NodeDto;
import hyfive.gachita.dispatch.dto.PathDispatchDto;
import hyfive.gachita.dispatch.module.condition.PathCondition;
import hyfive.gachita.application.node.Node;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

import static hyfive.gachita.application.car.QCar.car;
import static hyfive.gachita.application.node.QNode.node;
import static hyfive.gachita.application.path.QPath.path;

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

    private Map<Long, List<Node>> converToMap(List<Tuple> result) {
        return result.stream()
            .collect(groupingBy(
                    t -> t.get(path.id),
                    mapping(t -> t.get(node), toList())
            ));
    }

    private PathDispatchDto createPathDto(Long pathId, List<Node> nodeList) {
        List<NodeDto> nodeDtoList = nodeList.stream()
                .map(this::createNodeDto)
                .toList();

        return PathDispatchDto.builder()
                .pathId(pathId)
                .nodes(nodeDtoList)
                .build();
    }

    private NodeDto createNodeDto(Node nodeEntity) {
        return NodeDto.builder()
                .nodeId(nodeEntity.getId())
                .lat(nodeEntity.getLat())
                .lng(nodeEntity.getLng())
                .time(nodeEntity.getTime())
                .type(nodeEntity.getType())
                .build();
    }
}
