package hyfive.gachita.domain.node;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/node")
@RequiredArgsConstructor
public class NodeController {
    private final NodeService nodeService;
}
