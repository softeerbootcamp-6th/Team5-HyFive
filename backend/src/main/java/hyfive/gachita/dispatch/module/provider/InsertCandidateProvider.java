package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.dispatch.dto.NodeDispatchLocationDto;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class InsertCandidateProvider {

    public List<Integer> findInsertCandidates(
            List<NodeDispatchLocationDto> originalNodes,
            NodeDispatchLocationDto newNode
    ) {
        List<Integer> candidates = new ArrayList<>();
        for (int i = 0; i < originalNodes.size(); i++) {
            NodeDispatchLocationDto node = originalNodes.get(i);

            LocalTime newNodeStart = newNode.deadline().getFirst();
            LocalTime newNodeEnd = newNode.deadline().getSecond();

            if (node.time().isAfter(newNodeStart) &&
                    node.time().isBefore(newNodeEnd)) {
                candidates.add(i + 1);
            }
        }
        return candidates;
    }
}
