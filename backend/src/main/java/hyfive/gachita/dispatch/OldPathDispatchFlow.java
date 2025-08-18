package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.InsertPathEvaluationResult;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.NodeDispatchLocationDto;
import hyfive.gachita.dispatch.module.calculator.InsertPathInfoCalculator;
import hyfive.gachita.dispatch.module.provider.InsertCandidateProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
public class OldPathDispatchFlow {
    private final InsertCandidateProvider insertCandidateProvider;
    private final InsertPathInfoCalculator insertPathInfoCalculator;

    public void execute(List<Long> pathIds, NewBookDto newBook) {
        // TODO : 1. pathIds List<Long> 기준으로 path 테이블로 부터 아래 조건을 만족하는 path가 있는지 확인

        // TODO : 2. 위에 걸러진 path ID에 해당하는 Node getAll() NodeDispatchLocationDto
        List<NodeDispatchLocationDto> originalNodes = List.of();

        // TODO : 3. 배차 차량이 존재하는가 확인 (완전 탐색 시작!!)
        // TODO : 3-1. 단일 경로 내 최적 경로 후보 선출
        NodeDispatchLocationDto newBookStartNode = NodeDispatchLocationDto.newBookStartNodeFrom(newBook);
        NodeDispatchLocationDto newBookEndNode = NodeDispatchLocationDto.newBookEndNodeFrom(newBook);

        List<Integer> startCandidates = insertCandidateProvider.findInsertCandidates(originalNodes, newBookStartNode);
        List<Integer> endCandidates = insertCandidateProvider.findInsertCandidates(originalNodes, newBookEndNode);

        List<InsertPathEvaluationResult> candidates = new ArrayList<>();

        for (Integer si : startCandidates) {
            for (Integer ei : endCandidates) {
                if (si < ei) {
                    List<NodeDispatchLocationDto> candidatePath = new ArrayList<>(originalNodes);
                    candidatePath.add(si, newBookStartNode);
                    candidatePath.add(ei + 1, newBookEndNode);

                    InsertPathEvaluationResult result = insertPathInfoCalculator.calculate(candidatePath);
                    if (result != null) candidates.add(result);
                }
            }
        }

        candidates.stream()
            .min(Comparator.comparingInt(InsertPathEvaluationResult::totalDuration)
                    .thenComparingInt(InsertPathEvaluationResult::totalDistance))
            .orElse(null);

        // TODO : 3-2. 다중 경로 중 최적 경로 선출
    }
}
