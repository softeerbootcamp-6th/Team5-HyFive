package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.dispatch.dto.NodeDispatchLocationDto;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Component
public class InsertCandidateProvider {

    public List<Integer> findInsertCandidates(
            List<NodeDispatchLocationDto> originalNodes,
            NodeDispatchLocationDto newNode
    ) {
        Set<Integer> candidates = new LinkedHashSet<>();

        LocalTime newStartNode = newNode.deadline().getFirst();
        LocalTime newEndNode = newNode.deadline().getSecond();

        for (int i = 0; i < originalNodes.size(); i++) {
            NodeDispatchLocationDto node = originalNodes.get(i);

            if (node.time().isAfter(newStartNode) &&
                    node.time().isBefore(newEndNode)) {
                candidates.add(i);
                candidates.add(i + 1);
            }
        }

        return new ArrayList<>(candidates);
    }
}
