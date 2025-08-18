package hyfive.gachita.dispatch;

import hyfive.gachita.dispatch.dto.InsertPathEvaluationResult;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.NodeDispatchLocationDto;
import hyfive.gachita.dispatch.module.calculator.InsertPathInfoCalculator;
import hyfive.gachita.dispatch.module.provider.InsertCandidateProvider;
import hyfive.gachita.dispatch.module.provider.NewNodeProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
public class OldPathDispatchFlow {
    private final NewNodeProvider newNodeProvider;
    private final InsertCandidateProvider insertCandidateProvider;
    private final InsertPathInfoCalculator insertPathInfoCalculator;

    public InsertPathEvaluationResult execute(List<NodeDispatchLocationDto> originalNodes, NewBookDto newBook) {
        var pickupNode = newNodeProvider.createStartNode(newBook);
        var dropNode = newNodeProvider.createEndNode(newBook);

        List<Integer> pickupCandidates = insertCandidateProvider.findInsertCandidates(originalNodes, pickupNode);
        List<Integer> dropCandidates = insertCandidateProvider.findInsertCandidates(originalNodes, dropNode);

        List<InsertPathEvaluationResult> candidates = new ArrayList<>();

        for (Integer pi : pickupCandidates) {
            for (Integer di : dropCandidates) {
                if (pi < di) {
                    List<NodeDispatchLocationDto> candidatePath = new ArrayList<>(originalNodes);
                    candidatePath.add(pi, pickupNode);
                    candidatePath.add(di + 1, dropNode);

                    InsertPathEvaluationResult result = insertPathInfoCalculator.calculate(candidatePath);
                    if (result != null) candidates.add(result);
                }
            }
        }

        return candidates.stream()
                .min(Comparator.comparingInt(InsertPathEvaluationResult::totalDuration)
                        .thenComparingInt(InsertPathEvaluationResult::totalDistance))
                .orElse(null);
    }
}
