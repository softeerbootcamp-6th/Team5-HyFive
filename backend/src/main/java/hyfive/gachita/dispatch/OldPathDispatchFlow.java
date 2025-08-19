package hyfive.gachita.dispatch;

import hyfive.gachita.client.kakao.RouteInfo;
import hyfive.gachita.dispatch.dto.FinalOldPathDto;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.NodeDto;
import hyfive.gachita.dispatch.excepion.DispatchExpectedException;
import hyfive.gachita.dispatch.module.calculator.InsertPathInfoCalculator;
import hyfive.gachita.dispatch.module.provider.SlotCandidateProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
public class OldPathDispatchFlow {
    private final SlotCandidateProvider slotCandidateProvider;
    private final InsertPathInfoCalculator insertPathInfoCalculator;

    private final List<FinalOldPathDto> finalPathCandidates = new  ArrayList<>();

    public void execute(List<Long> pathIds, NewBookDto newBook) {
        // TODO : 1. pathIds List<Long> 기준으로 path 테이블로 부터 아래 조건을 만족하는 path가 있는지 확인

        // TODO : 2. 위에 걸러진 path ID에 해당하는 Node getAll() NodeDispatchLocationDto
        List<List<NodeDto>> pathCandidates = List.of();

        // TODO : 3. 배차 차량이 존재하는가 확인 (완전 탐색 시작!!)
        // TODO : 3-1. 단일 경로 내 최적 경로 후보 선출

        for(int i = 0; i < pathCandidates.size(); i++){
            List<NodeDto> originalNodes = pathCandidates.get(i);

            NodeDto newBookStartNode = NodeDto.newBookStartNodeFrom(newBook);
            NodeDto newBookEndNode = NodeDto.newBookEndNodeFrom(newBook);

            List<Integer> startSlotCandidates = slotCandidateProvider.findSlotCandidates(originalNodes, newBookStartNode);
            List<Integer> endSlotCandidates = slotCandidateProvider.findSlotCandidates(originalNodes, newBookEndNode);

            List<FinalOldPathDto> candidates = new ArrayList<>();

            for (Integer si : startSlotCandidates) {
                for (Integer ei : endSlotCandidates) {
                    if (si <= ei) {
                        List<NodeDto> candidatePath = new ArrayList<>(originalNodes);
                        candidatePath.add(ei, newBookEndNode);
                        candidatePath.add(si, newBookStartNode);

                        RouteInfo candidatePathRouteInfo = insertPathInfoCalculator.calculate(candidatePath);
                        if (candidatePathRouteInfo != null) {

                            FinalOldPathDto result = FinalOldPathDto.builder()
                                    .pathId(null) // TODO : 값 불러오기 필요
                                    .carId(null) // TODO : 값 불러오기 필요
                                    .newNodes(List.of(newBookStartNode, newBookEndNode))
                                    .oldNodes(new ArrayList<>(originalNodes))
                                    .totalDuration(candidatePathRouteInfo.totalDuration())
                                    .totalDistance(candidatePathRouteInfo.totalDistance())
                                    .build();

                            candidates.add(result);
                        }
                    }
                }
            }

            // 후보 들을 totalDuration이 작은 것이 앞에오는 순서대로, totalDuration이 같다면 totalDistance가 작은 것이 앞에 오는 순서대로 정렬.
            candidates.stream()
                    .min(Comparator.comparingInt(FinalOldPathDto::totalDuration)
                            .thenComparingInt(FinalOldPathDto::totalDistance))
                    .orElseThrow(() -> new DispatchExpectedException("단일 경로 내 총 이동시간"));

            // 1순위 최종 후보에 올리기
            finalPathCandidates.add(candidates.get(0));
        }

        // TODO : 3-2. 다중 경로 중 최적 경로 선출
        FinalOldPathDto bestPath = finalPathCandidates.stream()
                .min(Comparator
                        .comparing(FinalOldPathDto::totalDuration)
                        .thenComparing(FinalOldPathDto::totalDistance)
                )
                .orElseThrow(() -> new DispatchExpectedException("총 이동시간"));

        // TODO : 최종 경로 time 넣어주기!
    }
}
