package hyfive.gachita.demo;

import hyfive.gachita.application.book.BookStatus;
import hyfive.gachita.application.node.Node;
import hyfive.gachita.application.node.Point;
import hyfive.gachita.application.node.Segment;
import hyfive.gachita.application.path.DriveStatus;
import hyfive.gachita.application.path.Path;
import hyfive.gachita.application.path.respository.PathRepository;
import hyfive.gachita.client.geocode.dto.LatLng;
import hyfive.gachita.client.kakao.KakaoNaviService;
import hyfive.gachita.client.kakao.RouteInfo;
import hyfive.gachita.global.BusinessException;
import hyfive.gachita.global.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class DemoService {
    private final PathRepository pathRepository;
    private final KakaoNaviService kakaoNaviService;

    @Transactional
    public void savePolyline(Long pathId) {
        List<Node> nodeList = pathRepository.findNodeListByPathId(pathId);

        if (nodeList.isEmpty()) {
            throw new BusinessException(ErrorCode.NO_EXIST_VALUE, "경로에 노드가 존재하지 않습니다. pathId=" + pathId);
        }

        if (nodeList.stream().anyMatch(node -> node.getLeftSegment() != null)) {
            throw new BusinessException(ErrorCode.INVALID_INPUT, "이미 polyline이 존재하는 경로입니다. pathId=" + pathId);
        }

        List<LatLng> locationList = nodeList.stream()
                .map(node -> new LatLng(node.getLat(), node.getLng()))
                .toList();

        RouteInfo routeInfo = kakaoNaviService.geRouteInfo(locationList);
        List<List<LatLng>> polylineList = routeInfo.polylineList();

        log.info("Polyline size: {}", polylineList.size());
        for (int i = 0; i < polylineList.size(); i++) {
            Node node = nodeList.get(i + 1);

            List<LatLng> polyline = polylineList.get(i);

            Segment segment = Segment.builder()
                    .startNode(nodeList.get(i))
                    .endNode(node)
                    .duration(routeInfo.durationList().get(i))
                    .sequence(i + 1)
                    .build();

            List<Point> points = polyline.stream()
                    .map(point -> Point.builder()
                            .segment(segment)
                            .lat(point.lat())
                            .lng(point.lng())
                            .build())
                    .toList();

            segment.setPoints(points);
            node.setLeftSegment(segment);
            node.getBook().update(BookStatus.FIXED);
        }
    }

    @Transactional
    public Map<String, Object> saveTodayPathPolyline() {
        LocalDate today = LocalDate.now();
        List<Path> pathList = pathRepository.findAllByDriveDate(today);

        int successCount = 0;
        List<Long> failedIds = new ArrayList<>();

        for (Path path : pathList) {
            try {
                savePolyline(path.getId());
                successCount++;
            } catch (Exception e) {
                log.error("Failed to save polyline for pathId {}: {}", path.getId(), e.getMessage());
                failedIds.add(path.getId());
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("total", pathList.size());
        result.put("success", successCount);
        result.put("failedIds", failedIds);

        return result;
    }


    @Transactional
    public Map<String, Object> changeDriveStatus(Long id, DriveStatus status) {
        Path path = pathRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NO_EXIST_VALUE, "DB에 경로 데이터가 존재하지 않습니다."));
        DriveStatus prevStatus = path.getDriveStatus();
        path.setDriveStatus(status);
        Map<String, Object> result = new HashMap<>();
        result.put("pathId", path.getId());
        result.put("prevStatus", prevStatus);
        result.put("newStatus", path.getDriveStatus());

        return result;
    }
}
