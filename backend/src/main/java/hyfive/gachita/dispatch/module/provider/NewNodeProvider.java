package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.application.node.NodeType;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.NodeDispatchLocationDto;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

@Component
public class NewNodeProvider {

    public NodeDispatchLocationDto createStartNode(NewBookDto newBook) {
        return NodeDispatchLocationDto.builder()
                .nodeId(newBook.id())
                .lat(newBook.startLat())
                .lng(newBook.startLng())
                .time(null)
                .type(NodeType.START)
                .deadline(Pair.of(newBook.deadline().minusMinutes(30), newBook.deadline()))
                .build();
    }

    public NodeDispatchLocationDto createEndNode(NewBookDto newBook) {
        return NodeDispatchLocationDto.builder()
                .nodeId(newBook.id())
                .lat(newBook.endLat())
                .lng(newBook.endLng())
                .time(null)
                .type(NodeType.END)
                .deadline(Pair.of(newBook.deadline().minusMinutes(30), newBook.deadline()))
                .build();
    }
}