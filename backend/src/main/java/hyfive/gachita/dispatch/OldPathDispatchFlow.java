package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.FinalPathCandidateDto;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.NodeDto;
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

    public void execute(List<Long> pathIds, NewBookDto newBook) {
        // TODO : 1. pathIds List<Long> 기준으로 path 테이블로 부터 아래 조건을 만족하는 path가 있는지 확인

        // TODO : 2. 위에 걸러진 path ID에 해당하는 Node getAll() NodeDispatchLocationDto
        List<NodeDto> originalNodes = List.of();

        // TODO : 3. 배차 차량이 존재하는가 확인 (완전 탐색 시작!!)
        // TODO : 3-1. 단일 경로 내 최적 경로 후보 선출
        NodeDto newBookStartNode = NodeDto.newBookStartNodeFrom(newBook);
        NodeDto newBookEndNode = NodeDto.newBookEndNodeFrom(newBook);

        List<Integer> startSlotCandidates = slotCandidateProvider.findSlotCandidates(originalNodes, newBookStartNode);
        List<Integer> endSlotCandidates = slotCandidateProvider.findSlotCandidates(originalNodes, newBookEndNode);

        List<FinalPathCandidateDto> candidates = new ArrayList<>();

        for (Integer si : startSlotCandidates) {
            for (Integer ei : endSlotCandidates) {
                if (si <= ei) {
                    List<NodeDto> candidatePath = new ArrayList<>(originalNodes);
                    candidatePath.add(ei, newBookEndNode);
                    candidatePath.add(si, newBookStartNode);

                    FinalPathCandidateDto result = insertPathInfoCalculator.calculate(candidatePath);
                    if (result != null) candidates.add(result);
                }
            }
        }

        candidates.stream()
            .min(Comparator.comparingInt(FinalPathCandidateDto::totalDuration)
                    .thenComparingInt(FinalPathCandidateDto::totalDistance))
            .orElse(null);

        // TODO : 3-2. 다중 경로 중 최적 경로 선출

        // TODO : 최종 경로 time 넣어주기!
    }
}
