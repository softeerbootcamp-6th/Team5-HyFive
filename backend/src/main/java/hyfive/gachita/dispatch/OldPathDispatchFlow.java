package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.*;
import hyfive.gachita.dispatch.excepion.DispatchException;
import hyfive.gachita.dispatch.module.calculator.InsertNodeCalculator;
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
    private final InsertNodeCalculator insertNodeCalculator;
    private final OldPathListProvider oldPathListProvider;

    public DispatchResult execute(List<Long> pathIds, NewBookDto newBook) {
        // path - 최종 후보 리스트
        List<FinalOldPathDto> finalPathCandidates = new ArrayList<>();

        // path - 후보 리스트
        PathCondition condition = PathCondition.from(pathIds, newBook);
        List<OldPathDto> pathCandidates = oldPathListProvider.getByCondition(condition);

        // single path - new book node 삽입 후 bestPath 선출
        for (OldPathDto pathCandidate : pathCandidates) {
            // old path 정보
            Long pathId = pathCandidate.pathId();
            Long carId = pathCandidate.carId();
            List<NodeDto> oldNodes = pathCandidate.nodes();

            // new book node 정보
            NodeDto newBookStartNode = NodeDto.newBookStartNodeFrom(newBook);
            NodeDto newBookEndNode = NodeDto.newBookEndNodeFrom(newBook);

            // slot - new book node 삽입 위치 후보 선출
            List<Integer> startSlotCandidates = slotCandidateProvider.findSlotCandidates(oldNodes, newBookStartNode);
            List<Integer> endSlotCandidates = slotCandidateProvider.findSlotCandidates(oldNodes, newBookEndNode);

            // new book node 삽입 - 완전 탐색
            List<FinalOldPathDto> singlePathCandidates = new ArrayList<>();

            for (Integer si : startSlotCandidates) {
                for (Integer ei : endSlotCandidates) {
                    if (si <= ei) {
                        List<NodeDto> candidatePath = new ArrayList<>(oldNodes);
                        candidatePath.add(ei, newBookEndNode);
                        candidatePath.add(si, newBookStartNode);

                        UpdatedPathDto updatedPath = insertNodeCalculator.getUpdatedPath(candidatePath);
                        if (updatedPath != null) {
                            FinalOldPathDto finalOldPath = FinalOldPathDto.builder()
                                    .pathId(pathId)
                                    .carId(carId)
                                    .nodeList(updatedPath.updatedNodes())
                                    .totalDuration(updatedPath.routeInfo().totalDuration())
                                    .totalDistance(updatedPath.routeInfo().totalDistance())
                                    .build();

                            singlePathCandidates.add(finalOldPath);
                        }
                    }
                }
            }

            // bestPath 선출
            singlePathCandidates.stream()
                    .min(Comparator
                            .comparingInt(FinalOldPathDto::totalDuration)
                            .thenComparingInt(FinalOldPathDto::totalDistance))
                    .orElseThrow(() -> new DispatchException("단일 경로 내에서 최종 경로 후보를 선정하던 중 오류가 발생했습니다."));

            finalPathCandidates.add(singlePathCandidates.get(0));
        }

        // multi path - 최종 bestPath 선출
        FinalOldPathDto bestPath = finalPathCandidates.stream()
                .min(Comparator
                        .comparingInt(FinalOldPathDto::totalDuration)
                        .thenComparingInt(FinalOldPathDto::totalDistance)
                )
                .orElseThrow(() -> new DispatchException("최종 경로 후보에서 최종 경로를 선정하던 중 오류가 발생했습니다."));

        return bestPath;
    }
}
