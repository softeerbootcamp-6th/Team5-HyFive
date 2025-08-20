package hyfive.gachita.application.node;

import hyfive.gachita.application.node.repository.NodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NodeService {
    private final NodeRepository nodeRepository;
}
