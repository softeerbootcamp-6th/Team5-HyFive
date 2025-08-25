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

import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class InsertNodeCalculator {

    private final int MAX_TOTAL_DURATION = 7200; // 2시간
    private final KakaoNaviService kakaoNaviService;

    public UpdatedPathDto getUpdatedPath(List<NodeDto> candidatePath) {
        log.debug("[getUpdatedPath] 시작. 후보 경로 노드 수: {}", candidatePath.size());

        List<LatLng> latLngList = candidatePath.stream()
                .map(node -> new LatLng(node.lat(), node.lng()))
                .toList();

        // 1. Kakao Navi API 호출
        log.trace(" -> KakaoNavi API 호출. Waypoints: {}개", latLngList.size());
        RouteInfo routeInfo = kakaoNaviService.geRouteInfo(latLngList);
        log.trace(" -> KakaoNavi API 응답. 총 소요시간: {}초, 총 거리: {}m", routeInfo.totalDuration(), routeInfo.totalDistance());

        // 2. API 결과를 바탕으로 각 노드의 예상 도착 시간 업데이트
        List<NodeDto> updatedTimeCandidatePath = updateNodeTime(candidatePath, routeInfo.durationList());

        // 3. 업데이트된 경로가 유효한지(마감시간 등) 검증
        if (!isDeadlineValid(updatedTimeCandidatePath, routeInfo)) {
            log.debug("[getUpdatedPath] 유효성 검증 실패. null을 반환합니다.");
            return null;
        }

        log.debug("[getUpdatedPath] 유효성 검증 성공. UpdatedPathDto를 생성하여 반환합니다.");
        return UpdatedPathDto.builder()
                .routeInfo(routeInfo)
                .updatedNodes(updatedTimeCandidatePath)
                .build();
    }

    /**
     * 첫 번째 노드의 시간을 기준으로, 각 구간별 소요시간(durationList)을 누적하여
     * 모든 노드의 예상 도착 시간을 새로 계산합니다.
     */
    private List<NodeDto> updateNodeTime(List<NodeDto> nodeList, List<Integer> durationList) {
        log.trace("[updateNodeTime] 노드 시간 업데이트 시작. 후보 노드 수: {}", nodeList.size());

        List<NodeDto> updatedList = new ArrayList<>();
        updatedList.add(nodeList.get(0)); // 첫 번째 노드는 그대로
        LocalTime previousTime = nodeList.get(0).time(); // 초기 기준

        for (int i = 1; i < nodeList.size(); i++) {
            NodeDto currentNode = nodeList.get(i);
            NodeDto previousNode = updatedList.get(i - 1);

            // Kakao API duration (i-1) -> (i) 로 이동하는데 걸리는 시간
            int travelSec = durationList.get(i - 1);

            // 이전 노드 slack 계산 (END 노드만)
            long slackSec = 0;
            if (previousNode.type() == NodeType.END) {
                LocalTime latest = currentNode.deadline().getSecond();
                slackSec = Math.max(0, Duration.between(previousTime.plusSeconds(travelSec), latest).getSeconds());
            }

            // earliest/latest 범위 계산
            LocalTime earliest = (currentNode.deadline() != null) ? currentNode.deadline().getFirst() : null;

            // 예상 도착 시간 = 이전 시간 + duration + slack(범위 내)
            LocalTime newTime = previousTime.plusSeconds(travelSec + slackSec);

            // deadline 조정
            if (earliest != null && newTime.isBefore(earliest)) newTime = earliest;

            NodeDto updatedNode = NodeDto.updateTime(currentNode, newTime);
            updatedList.add(updatedNode);
            previousTime = newTime;
            log.trace(" -> 노드 {} 시간 업데이트: {}", i, newTime);
        }

        return updatedList;
    }

//    private List<NodeDto> updateNodeTime(List<NodeDto> nodeList, List<Integer> durationList) {
//        LocalTime baseTime = nodeList.get(0).time();
//        log.trace("[updateNodeTime] 노드 시간 업데이트 시작. 기준 시간: {}, 구간별 소요시간 수: {}", baseTime, durationList.size());
//
//        List<NodeDto> updatedList = new ArrayList<>();
//        updatedList.add(nodeList.get(0)); // 첫 번째 노드는 기준이므로 그대로 추가
//
//        long cumulativeSeconds = 0;
//
//        for (int i = 1; i < nodeList.size(); i++) {
//            // 이전 노드와의 이동 시간을 누적
//            cumulativeSeconds += durationList.get(i - 1);
//            LocalTime newTime = baseTime.plusSeconds(cumulativeSeconds);
//
//            NodeDto updatedNode = NodeDto.updateTime(nodeList.get(i), newTime);
//            updatedList.add(updatedNode);
//            log.trace("  -> 노드 {} 시간 업데이트: {}", i, newTime);
//        }
//
//        return updatedList;
//    }

    /**
     * 계산된 경로가 비즈니스 규칙에 맞는지 검증합니다.
     * 1. 총 운행 시간이 최대 허용 시간을 초과하는지 확인
     * 2. 각 승객의 하차 노드 도착 시간이 요청된 마감 시간 범위 내에 있는지 확인
     */
    private boolean isDeadlineValid(List<NodeDto> nodeList, RouteInfo routeInfo) {
        log.trace("[isDeadlineValid] 경로 유효성 검증 시작.");
        // 1. 총 운행 시간 검증
        if (routeInfo.totalDuration() > MAX_TOTAL_DURATION) {
            log.debug("  -> 유효성 검증 실패: 총 소요시간 초과 (결과: {}초 > 최대: {}초)", routeInfo.totalDuration(), MAX_TOTAL_DURATION);
            return false;
        }

        // 2. 각 노드별 마감 시간 검증
        for (int i = 1; i < nodeList.size(); i++) {
            NodeDto node = nodeList.get(i);

            // 하차(END) 타입 노드만 마감 시간이 존재
            if (node.type() == NodeType.END) {
                LocalTime arrivalTime = node.time();
                LocalTime windowStartTime = node.deadline().getFirst();
                LocalTime windowEndTime = node.deadline().getSecond();

                if (arrivalTime.isBefore(windowStartTime) || arrivalTime.isAfter(windowEndTime)) {
                    log.debug("  -> 유효성 검증 실패: 노드 {}의 마감시간 위반 (예상 도착: {}, 허용 범위: {} - {})", i, arrivalTime, windowStartTime, windowEndTime);
                    return false;
                }
            }
        }

        log.trace("  -> 유효성 검증 통과.");
        return true;
    }
}