package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.dispatch.dto.NodeDto;
import hyfive.gachita.dispatch.excepion.DispatchException;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class SlotCandidateProvider {

    public List<Integer> findSlotCandidates(
            List<NodeDto> oldNodes,
            NodeDto newNode
    ) {
        List<Integer> candidates = new ArrayList<>();
        if (oldNodes.isEmpty()) {
            throw new DispatchException("슬롯 탐색 중 예외 발생 - 기존 경로 노드 리스트가 비어 있습니다.");
        }

        final int size = oldNodes.size();
        LocalTime startDeadline = newNode.deadline().getFirst();
        LocalTime endDeadline = newNode.deadline().getSecond();

        // 역순 탐색
        int rightBoundSlot = -1;
        for (int i = size - 1; i >= 0; i--) {
            LocalTime t = oldNodes.get(i).time();
            if (!(t.isAfter(endDeadline) || t.equals(endDeadline))) {
                rightBoundSlot = i + 1;
                break;
            }
        }

        // 순방향 탐색
        int leftBoundSlot = -1;
        for (int i = 0; i < size; i++) {
            LocalTime t = oldNodes.get(i).time();
            if (!(t.isBefore(startDeadline) || t.equals(startDeadline))) {
                leftBoundSlot = i;
                break;
            }
        }

        int from = Math.max(1, leftBoundSlot);
        int to   = Math.min(size, rightBoundSlot);

        for (int slot = from; slot <= to; slot++) {
            candidates.add(slot);
        }

        return candidates;
    }
}
