package hyfive.gachita.application.path;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.node.Node;
import hyfive.gachita.application.node.repository.NodeRepository;
import hyfive.gachita.application.node.NodeType;
import hyfive.gachita.application.path.dto.MapDrawRes;
import hyfive.gachita.application.path.dto.MarkerDto;
import hyfive.gachita.application.path.dto.PathRes;
import hyfive.gachita.application.path.respository.PathRepository;
import hyfive.gachita.dispatch.dto.FinalNewPathDto;
import hyfive.gachita.global.BusinessException;
import hyfive.gachita.global.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PathService {
    private final PathRepository pathRepository;
    private final NodeRepository nodeRepository;

    @Transactional
    public Path createPathWithNodes(FinalNewPathDto finalPathDto, Book book) {
        LocalTime startTime = finalPathDto.nodeList().get(0).time();
        LocalTime endTime = finalPathDto.nodeList().get(2).time();
        LocalTime maybeEndTime = minTime(finalPathDto.rentalEndTime(), startTime.plusHours(2));

        Path path = Path.builder()
                .car(finalPathDto.car())
                .rental(finalPathDto.rental())
                .maybeStartTime(startTime)  // TODO: 고정값, 필요 없다면 제거 고려
                .maybeEndTime(maybeEndTime)
                .realStartTime(startTime)
                .realEndTime(endTime)
                .driveDate(book.getHospitalDate())
                .startAddr(book.getStartAddr())
                .endAddr(book.getEndAddr())
                .userCount(1)
                .driveStatus(DriveStatus.WAITING)
                .build();

        List<Node> nodeList = finalPathDto.nodeList().stream()
                .map(nodeDto -> Node.builder()
                        .path(path)
                        .book(nodeDto.type() == NodeType.CENTER ? null : book)
                        .lat(nodeDto.lat())
                        .lng(nodeDto.lng())
                        .time(nodeDto.time())
                        .type(nodeDto.type())
                        .build()
                ).toList();
        path.setNodes(nodeList);
        return pathRepository.save(path);
    }

    public PathRes getPathByBook(Long bookId) {
        return pathRepository.findPathResByBookId(bookId)
                .orElseThrow(() -> new RuntimeException("경로 없음"));
    }

    public MapDrawRes getMapDraw(Long id) {
        Path path = pathRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NO_EXIST_VALUE, "DB에 경로 데이터가 존재하지 않습니다."));

        // marker list
        List<MarkerDto> markerList = nodeRepository.findByAllPathId(id);

        // segment list

        // highlight list

        return MapDrawRes.builder().build();
    }


    private LocalTime minTime(LocalTime timeA, LocalTime timeB) {
        return timeA.isBefore(timeB) ? timeA : timeB;
    }
}



