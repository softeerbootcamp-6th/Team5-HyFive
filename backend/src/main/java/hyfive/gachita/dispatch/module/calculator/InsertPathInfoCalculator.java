package hyfive.gachita.dispatch.module.calculator;

import hyfive.gachita.application.node.NodeType;
import hyfive.gachita.client.geocode.dto.LatLng;
import hyfive.gachita.client.kakao.KakaoNaviService;
import hyfive.gachita.client.kakao.RouteInfo;
import hyfive.gachita.dispatch.dto.NodeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class InsertPathInfoCalculator {

    private final int MAX_TOTAL_DURATION = 7200;
    private final KakaoNaviService kakaoNaviService;

    public RouteInfo calculate(List<NodeDto> candidatePath) {
        List<LatLng> latLngList = candidatePath.stream()
                .map(node -> new LatLng(node.lat(), node.lng()))
                .toList();

        RouteInfo route = kakaoNaviService.geRouteInfo(latLngList);

        if (!isValid(candidatePath, route)) return null;

        return route;
    }

    private boolean isValid(List<NodeDto> candidatePath, RouteInfo route) {
        if (route.totalDuration() > MAX_TOTAL_DURATION) return false;

        final int size = candidatePath.size();
        for (int i = 0; i < size; i++) {
            NodeDto node = candidatePath.get(i);

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
