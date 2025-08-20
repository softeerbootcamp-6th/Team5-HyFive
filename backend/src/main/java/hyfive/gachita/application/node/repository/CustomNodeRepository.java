package hyfive.gachita.application.node.repository;

import hyfive.gachita.application.path.dto.MarkerDto;
import hyfive.gachita.application.path.dto.SegmentDto;

import java.util.List;

public interface CustomNodeRepository {
    List<MarkerDto> findByAllPathId(Long pathId);
    List<SegmentDto> findSegmentsByMarkers(List<MarkerDto> markers);
}
