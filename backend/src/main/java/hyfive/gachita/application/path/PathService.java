package hyfive.gachita.application.path;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.common.dto.PagedListRes;
import hyfive.gachita.application.common.dto.ScrollRes;
import hyfive.gachita.application.common.enums.SearchPeriod;
import hyfive.gachita.application.common.util.DateRangeUtil;
import hyfive.gachita.application.node.Node;
import hyfive.gachita.application.node.NodeType;
import hyfive.gachita.application.path.dto.*;
import hyfive.gachita.application.path.respository.PathRepository;
import hyfive.gachita.dispatch.dto.FinalNewPathDto;
import hyfive.gachita.dispatch.dto.FinalOldPathDto;
import hyfive.gachita.dispatch.dto.NodeDto;
import hyfive.gachita.global.BusinessException;
import hyfive.gachita.global.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.Objects;
import java.util.stream.Collectors;

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

    @Transactional
    public Path updatePathWithNodes(FinalOldPathDto finalOldPathDto, Book book) {
        Path path = pathRepository.findById(finalOldPathDto.pathId())
                .orElseThrow(() -> new BusinessException(ErrorCode.NO_EXIST_VALUE, "DB에 경로 데이터가 존재하지 않습니다."));

        updateNodesInPath(path, finalOldPathDto.nodeList(), book);
        updatePathDetails(path, finalOldPathDto.nodeList(), book);

        return path;
    }

    public List<PassengerRes> getPathPassengers(Long pathId) {
        Path pathWithInfo = pathRepository.findPassengersByPathId(pathId);
        return pathWithInfo.getBookList().stream()
                .map(this::createPassengerDto)
                .sorted(Comparator.comparing(PassengerRes::onTime)) // 스트림 내에서 정렬
                .toList();
    }

    private PassengerRes createPassengerDto(Book book) {
        LocalTime startTime = findNodeByType(book, NodeType.START).getTime();
        LocalTime endTime = findNodeByType(book, NodeType.END).getTime();

        return PassengerRes.builder()
                .name(book.getBookName())
                .phoneNumber(book.getBookTel())
                .walker(book.getWalker())
                .onTime(startTime)
                .offTime(endTime)
                .build();
    }

    private Node findNodeByType(Book book, NodeType nodeType) {
        return book.getNodeList().stream()
                .filter(node -> node.getType() == nodeType) // 파라미터로 받은 nodeType을 사용
                .findFirst()
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

    public PagedListRes<PathDetailRes> getPathList(SearchPeriod period, DriveStatus status, int page, int limit) {
        Pageable pageable = PageRequest.of(
                page - 1,
                limit
        );

        Pair<LocalDate, LocalDate> dateRange = DateRangeUtil.getDateRange(LocalDate.now(), period);
        Page<Path> pageResult = pathRepository.searchPathPageByCondition(dateRange, status, pageable);
        List<PathDetailRes> pathResList = pageResult.getContent().stream().map(PathDetailRes::from).toList();
        return PagedListRes.<PathDetailRes>builder()
                .items(pathResList)
                .currentPageNum(pageResult.getNumber() + 1)
                .totalPageNum(pageResult.getTotalPages())
                .totalItemNum(pageResult.getTotalElements())
                .build();
    }

    public MapDrawRes getMapDraw(Long id) {
        // 데이터베이스에서 필요한 값 조회
        List<Node> orderedNodeList = pathRepository.findNodeListWithSegmentInfoByPathId(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NO_EXIST_VALUE, "DB에 경로 데이터가 존재하지 않습니다."));

        // 응답 형식으로 변환
        List<SegmentRes> segmentResList = getSegmentResList(orderedNodeList);
        List<MarkerRes> markerResList = getMarkerResList(orderedNodeList);
        List<HighlightRes> highlightResList = getHighlightResList(orderedNodeList, segmentResList);

        return MapDrawRes.builder()
                .polyline(segmentResList)
                .marker(markerResList)
                .highlight(highlightResList)
                .build();
    }

    private List<HighlightRes> getHighlightResList(List<Node> orderedNodeList, List<SegmentRes> segmentResList) {
        Map<Book, List<Node>> nodesByBook = orderedNodeList.stream()
                .filter(node -> node.getBook() != null)
                .collect(Collectors.groupingBy(Node::getBook));

        return nodesByBook.keySet().stream()
                .map(book -> {
                    Node startNode = findNodeByType(book, NodeType.START);
                    Node endNode = findNodeByType(book, NodeType.END);

                    int startIdx = orderedNodeList.indexOf(startNode);
                    int endIdx = orderedNodeList.indexOf(endNode);
                    List<Long> selectedSegment = segmentResList.subList(startIdx, endIdx).stream()
                            .map(SegmentRes::segmentId)
                            .toList();

                    return HighlightRes.from(startNode, endNode, book, selectedSegment);
                })
                .sorted(Comparator.comparing(HighlightRes::startTime))
                .toList();
    }

    private List<MarkerRes> getMarkerResList(List<Node> nodeList) {
        return nodeList.stream()
                .map(MarkerRes::from)
                .toList();
    }

    private List<SegmentRes> getSegmentResList(List<Node> nodeList) {
        return nodeList.stream()
                .map(Node::getLeftSegment)
                .filter(Objects::nonNull) // 센터의 경우 leftSegment가 null이므로 제외
                .map(SegmentRes::from)
                .toList();
    }

    private LocalTime minTime(LocalTime timeA, LocalTime timeB) {
        return timeA.isBefore(timeB) ? timeA : timeB;
    }

    private void updateNodesInPath(Path path, List<NodeDto> upateNodeList, Book book) {
        Map<Long, Node> oldNodeMap = path.getNodeList().stream()
                .collect(Collectors.toMap(Node::getId, Function.identity()));

        for (NodeDto nodeDto : upateNodeList) {
            if (nodeDto.nodeId() != null) {
                // update
                Node oldNode = oldNodeMap.get(nodeDto.nodeId());
                if (oldNode != null) {
                    oldNode.setTime(nodeDto.time());
                }
            } else {
                // create
                Node newNode = Node.builder()
                        .path(path)
                        .book(book)
                        .lat(nodeDto.lat())
                        .lng(nodeDto.lng())
                        .time(nodeDto.time())
                        .type(nodeDto.type())
                        .build();
                path.getNodeList().add(newNode);
            }
        }
    }

    private void updatePathDetails(Path path, List<NodeDto> updateNodeList, Book book) {
        if (updateNodeList.isEmpty()) {
            throw new BusinessException(ErrorCode.NO_EXIST_NODE_LIST, "OldPathDispatchFlow - 업데이트된 노드 리스트가 존재하지 않습니다.");
        }

        NodeDto lastNode = updateNodeList.get(updateNodeList.size() - 1);
        path.update(
                lastNode.time(),
                lastNode.time(),
                book.getEndAddr()
        );
    }
}



