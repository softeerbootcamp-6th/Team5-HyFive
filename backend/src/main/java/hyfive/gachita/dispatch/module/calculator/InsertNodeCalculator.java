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
        List<LatLng> latLngList = candidatePath.stream()
                .map(node -> new LatLng(node.lat(), node.lng()))
                .toList();

        RouteInfo routeInfo = kakaoNaviService.geRouteInfo(latLngList);
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
