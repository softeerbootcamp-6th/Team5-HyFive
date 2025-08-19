package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.*;
import hyfive.gachita.dispatch.excepion.DispatchException;
import hyfive.gachita.dispatch.module.calculator.InsertPathInfoCalculator;
import hyfive.gachita.dispatch.module.condition.PathCondition;
import hyfive.gachita.dispatch.module.provider.OldPathListProvider;
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
    private final OldPathListProvider oldPathListProvider;

    private final List<FinalOldPathDto> finalPathCandidates = new  ArrayList<>();

    public void execute(List<Long> pathIds, NewBookDto newBook) {
        // 1. pathIds List<Long> 기준으로 path 테이블로 부터 아래 조건을 만족하는 path가 있는지 확인
        // 2. 위에 걸러진 path ID에 해당하는 Node getAll() NodeDto
        PathCondition condition = PathCondition.builder()
                .maybeOnTime(newBook.maybeOnTime())
                .deadline(newBook.deadline())
                .walker(newBook.walker())
                .pathIds(pathIds)
                .build();
        List<OldPathDto> pathCandidates = oldPathListProvider.getByCondition(condition);

        // 3. 배차 차량이 존재하는 지 확인
        // 3-1. 단일 경로 내 최적 경로 후보 선출
        for (OldPathDto pathCandidate : pathCandidates) {
            Long pathId = pathCandidate.pathId();
            Long carId = pathCandidate.carId();
            List<NodeDto> oldNodes = pathCandidate.nodes();

            NodeDto newBookStartNode = NodeDto.newBookStartNodeFrom(newBook);
            NodeDto newBookEndNode = NodeDto.newBookEndNodeFrom(newBook);

            List<Integer> startSlotCandidates = slotCandidateProvider.findSlotCandidates(oldNodes, newBookStartNode);
            List<Integer> endSlotCandidates = slotCandidateProvider.findSlotCandidates(oldNodes, newBookEndNode);

            List<FinalOldPathDto> candidates = new ArrayList<>();

            for (Integer si : startSlotCandidates) {
                for (Integer ei : endSlotCandidates) {
                    if (si <= ei) {
                        List<NodeDto> candidatePath = new ArrayList<>(oldNodes);
                        candidatePath.add(ei, newBookEndNode);
                        candidatePath.add(si, newBookStartNode);

                        UpdatedPathDto updatedPath = insertPathInfoCalculator.calculate(candidatePath);
                        if (updatedPath != null) {
                            List<NodeDto> newNodes = List.of(
                                    updatedPath.updatedNodes().remove(ei.intValue()),
                                    updatedPath.updatedNodes().remove(si.intValue())
                            );

                            FinalOldPathDto finalOldPathDto = FinalOldPathDto.builder()
                                    .pathId(pathId)
                                    .carId(carId)
                                    .newNodes(newNodes)
                                    .oldNodes(new ArrayList<>(oldNodes))
                                    .totalDuration(updatedPath.routeInfo().totalDuration())
                                    .totalDistance(updatedPath.routeInfo().totalDistance())
                                    .build();

                            candidates.add(finalOldPathDto);
                        }
                    }
                }
            }

            // 후보 들을 totalDuration이 작은 것이 앞에오는 순서대로, totalDuration이 같다면 totalDistance가 작은 것이 앞에 오는 순서대로 정렬.
            candidates.stream()
                    .min(Comparator.comparingInt(FinalOldPathDto::totalDuration)
                            .thenComparingInt(FinalOldPathDto::totalDistance))
                    .orElseThrow(() -> new DispatchException("단일 경로 내 총 이동시간"));

            // 1순위 최종 후보에 올리기
            finalPathCandidates.add(candidates.get(0));
        }

        // 3-2. 다중 경로 중 최적 경로 선출
        FinalOldPathDto bestPath = finalPathCandidates.stream()
                .min(Comparator
                        .comparing(FinalOldPathDto::totalDuration)
                        .thenComparing(FinalOldPathDto::totalDistance)
                )
                .orElseThrow(() -> new DispatchException("총 이동시간"));
    }
}
