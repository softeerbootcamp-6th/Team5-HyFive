package hyfive.gachita.application.node.repository;

import hyfive.gachita.application.path.dto.HighlightRes;
import hyfive.gachita.application.path.dto.MarkerRes;
import hyfive.gachita.application.path.dto.SegmentRes;

import java.util.List;

public interface CustomNodeRepository {
    List<MarkerRes> findByAllPathId(Long pathId);
    List<SegmentRes> findSegmentsByMarkers(List<MarkerRes> markers);
    List<HighlightRes> getHighlightsByPath(Long pathId);
}
