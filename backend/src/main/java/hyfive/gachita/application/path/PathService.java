package hyfive.gachita.application.path;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.common.dto.ScrollRes;
import hyfive.gachita.application.node.Node;
import hyfive.gachita.application.node.NodeType;
import hyfive.gachita.application.path.dto.PassengerRes;
import hyfive.gachita.application.path.dto.PathCursor;
import hyfive.gachita.application.path.dto.PathDetailRes;
import hyfive.gachita.application.path.dto.PathRes;
import hyfive.gachita.application.path.respository.PathRepository;
import hyfive.gachita.dispatch.dto.FinalNewPathDto;
import hyfive.gachita.global.BusinessException;
import hyfive.gachita.global.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PathService {
    private final PathRepository pathRepository;

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

    public List<PassengerRes> getPathPassengers(Long pathId) {
        Path pathWithInfo = pathRepository.findPassengersByPathId(pathId);
        return pathWithInfo.getBookList().stream()
                .map(this::createPassengerDto)
                .sorted(Comparator.comparing(PassengerRes::onTime)) // 스트림 내에서 정렬
                .toList();
    }

    private PassengerRes createPassengerDto(Book book) {
        LocalTime startTime = findNodeTimeByType(book, NodeType.START);
        LocalTime endTime = findNodeTimeByType(book, NodeType.END);

        return PassengerRes.builder()
                .name(book.getBookName())
                .phoneNumber(book.getBookTel())
                .walker(book.getWalker())
                .onTime(startTime)
                .offTime(endTime)
                .build();
    }

    private LocalTime findNodeTimeByType(Book book, NodeType nodeType) {
        return book.getNodeList().stream()
                .filter(node -> node.getType() == nodeType) // 파라미터로 받은 nodeType을 사용
                .findFirst()
                .map(Node::getTime)
                .orElseThrow(() -> new BusinessException(
                        ErrorCode.NO_EXIST_VALUE,
                        String.format("경로에 %s 노드가 없습니다. bookId: %d", nodeType, book.getId())
                ));
    }

    public ScrollRes<PathDetailRes, PathCursor> getPathListScroll(DriveStatus status, PathCursor cursor, int size) {
        List<Path> pathList = pathRepository.findPathsForScroll(LocalDate.now(), status, cursor, size);

        boolean hasNext = pathList.size() > size;

        List<Path> actualList = hasNext ? pathList.subList(0, size) : pathList;

        List<PathDetailRes> pathResList = actualList.stream()
                .map(PathDetailRes::from)
                .toList();

        PathCursor lastCursor = null;
        if (!actualList.isEmpty()) {
            Path lastPath = actualList.get(actualList.size() - 1);
            lastCursor = PathCursor.builder()
                    .lastId(lastPath.getId())
                    .lastStartTime(lastPath.getRealStartTime())
                    .lastEndTime(lastPath.getRealEndTime()
                    )
                    .build();
        }

        return ScrollRes.<PathDetailRes, PathCursor>builder()
                .items(pathResList)
                .hasNext(hasNext)
                .cursor(lastCursor)
                .build();
    }

    private LocalTime minTime(LocalTime timeA, LocalTime timeB) {
        return timeA.isBefore(timeB) ? timeA : timeB;
    }
}
