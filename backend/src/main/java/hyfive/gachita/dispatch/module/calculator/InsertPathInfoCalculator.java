package hyfive.gachita.dispatch.module.calculator;

import hyfive.gachita.client.geocode.dto.LatLng;
import hyfive.gachita.client.kakao.KakaoNaviService;
import hyfive.gachita.client.kakao.RouteInfo;
import hyfive.gachita.dispatch.dto.FinalPathCandidateDto;
import hyfive.gachita.dispatch.dto.NodeDispatchLocationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class InsertPathInfoCalculator {

    private final int MAX_TOTAL_DURATION = 7200;
    private final KakaoNaviService kakaoNaviService;

    public FinalPathCandidateDto calculate(List<NodeDispatchLocationDto> candidatePath) {
        List<LatLng> latLngList = candidatePath.stream()
                .map(node -> new LatLng(node.lat(), node.lng()))
                .toList();

        RouteInfo route = kakaoNaviService.geRouteInfo(latLngList);

        if (!isValid(candidatePath, route)) return null;

        return new FinalPathCandidateDto(
                null,
                null,
                List.of(), // 신규 예약 노드
                candidatePath,
                route.totalDuration(),
                route.totalDistance()
        );
    }

    private boolean isValid(List<NodeDispatchLocationDto> candidatePath, RouteInfo route) {
        if (route.totalDuration() > MAX_TOTAL_DURATION) return false;

        LocalTime startTime = candidatePath.get(0).time();
        int accumulatedSec = 0;

        for (int idx = 1; idx < candidatePath.size(); idx++) {
            NodeDispatchLocationDto curr = candidatePath.get(idx);

            int durationSec = route.durationList().get(idx - 1);
            accumulatedSec += durationSec;
            LocalTime arrivalTime = startTime.plusSeconds(accumulatedSec);

            LocalTime windowStart = curr.deadline().getFirst();
            LocalTime windowEnd = curr.deadline().getSecond();
            if (arrivalTime.isBefore(windowStart) || arrivalTime.isAfter(windowEnd)) {
                return false;
            }
        }
        return true;
    }
}
