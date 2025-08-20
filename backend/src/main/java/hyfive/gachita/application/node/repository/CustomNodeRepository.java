package hyfive.gachita.application.node.repository;

import hyfive.gachita.application.node.dto.SegmentDto;
import hyfive.gachita.application.path.dto.HighlightRes;
import hyfive.gachita.application.path.dto.MarkerRes;

import java.util.List;

public interface CustomNodeRepository {
    List<MarkerRes> findByAllPathId(Long pathId);
    List<SegmentDto> findSegmentsByMarkers(List<MarkerRes> markers);
    List<HighlightRes> getHighlightsByPath(Long pathId);
}
