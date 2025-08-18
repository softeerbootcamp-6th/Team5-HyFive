package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.dispatch.dto.NodeDto;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Component
public class InsertCandidateProvider {

    public List<Integer> findInsertCandidates(
            List<NodeDto> originalNodes,
            NodeDto newNode
    ) {
        Set<Integer> candidates = new LinkedHashSet<>();

        LocalTime newStartNode = newNode.deadline().getFirst();
        LocalTime newEndNode = newNode.deadline().getSecond();

        for (int i = 0; i < originalNodes.size(); i++) {
            NodeDto node = originalNodes.get(i);

            if (node.time().isAfter(newStartNode) &&
                    node.time().isBefore(newEndNode)) {
                candidates.add(i);     // (i) slot: 노드 i 앞
                candidates.add(i + 1); // (i+1) slot: 노드 i 뒤
            }
        }

        // slot index 는 [0..size] 범위까지만 유효해야 함
        candidates.removeIf(idx -> idx < 0 || idx > originalNodes.size());

        return new ArrayList<>(candidates);
    }
}
