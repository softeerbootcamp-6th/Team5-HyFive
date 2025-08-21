package hyfive.gachita.dispatch.module.calculator;

import hyfive.gachita.application.node.NodeType;
import hyfive.gachita.client.geocode.dto.LatLng;
import hyfive.gachita.client.kakao.KakaoNaviService;
import hyfive.gachita.client.kakao.RouteInfo;
import hyfive.gachita.dispatch.dto.NodeDto;
import hyfive.gachita.dispatch.dto.UpdatedPathDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class InsertNodeCalculator {

    private final int MAX_TOTAL_DURATION = 7200;
    private final KakaoNaviService kakaoNaviService;

    public UpdatedPathDto getUpdatedPath(List<NodeDto> candidatePath) {
        // [수정] 실제 API를 호출하는 대신, 시뮬레이션 로그를 남깁니다.
        log.trace("getUpdatedPath 호출됨. (Kakao API 호출 시뮬레이션)");

        List<LatLng> latLngList = candidatePath.stream()
                .map(node -> new LatLng(node.lat(), node.lng()))
                .toList();

        RouteInfo routeInfo = kakaoNaviService.geRouteInfo(latLngList);

//        // ======================= [추가] 테스트를 위한 가짜 데이터 생성 =======================
//        // 경로 노드 수에 기반하여 그럴듯한 가짜 데이터를 만듭니다.
//        // 이렇게 하면 이후 로직(isDeadlineValid 등)이 정상적으로 동작하여 NullPointerException 등을 방지할 수 있습니다.
//        int nodeCount = candidatePath.size();
//        if (nodeCount < 2) {
//            return null; // 노드가 2개 미만이면 경로가 성립하지 않음
//        }
//        // 각 구간(segment)의 소요시간을 300초(5분)로 가정
//        List<Integer> dummyDurations = Collections.nCopies(nodeCount - 1, 300);
//        int totalDuration = dummyDurations.stream().mapToInt(Integer::intValue).sum();
//        int totalDistance = (nodeCount - 1) * 2000; // 각 구간 거리를 2km로 가정
//        RouteInfo routeInfo = new RouteInfo(totalDuration, totalDistance, List.of(), List.of(), dummyDurations);
//        // ==============================================================================

        List<NodeDto> updatedTimeCandidatePath = updateNodeTime(candidatePath, routeInfo.durationList());

        if (!isDeadlineValid(updatedTimeCandidatePath, routeInfo)) return null;

        return UpdatedPathDto.builder()
                .routeInfo(routeInfo)
                .updatedNodes(updatedTimeCandidatePath)
                .build();
    }

    // node time update
    private List<NodeDto> updateNodeTime(List<NodeDto> nodeList, List<Integer> durationList) {
        List<NodeDto> updatedList = new ArrayList<>();
        LocalTime baseTimeSec = nodeList.get(0).time();
        int cumulativeSec = 0;

        updatedList.add(nodeList.get(0));

        for (int i = 1; i < nodeList.size(); i++) {
            cumulativeSec += durationList.get(i - 1);
            LocalTime newTime = baseTimeSec.plusSeconds(cumulativeSec);

            NodeDto updatedNode = NodeDto.updateTime(nodeList.get(i), newTime);

            updatedList.add(updatedNode);
        }

        return updatedList;
    }

    // node time의 deadline 확인
    private boolean isDeadlineValid(List<NodeDto> nodeList, RouteInfo routeInfo) {
        if (routeInfo.totalDuration() > MAX_TOTAL_DURATION) return false;

        for (int i = 1; i < nodeList.size(); i++) {
            NodeDto node = nodeList.get(i);

            if (node.type() == NodeType.END) {
                int arrivalSec = node.time().toSecondOfDay();
                int windowStartSec = node.deadline().getFirst().toSecondOfDay();
                int windowEndSec = node.deadline().getSecond().toSecondOfDay();

                if (arrivalSec < windowStartSec || arrivalSec > windowEndSec) {
                    return false;
                }
            }
        }

        return true;
    }
}
