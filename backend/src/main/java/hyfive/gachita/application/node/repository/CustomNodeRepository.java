package hyfive.gachita.application.node.repository;

import hyfive.gachita.application.path.dto.MarkerDto;

import java.util.List;

public interface CustomNodeRepository {
    List<MarkerDto> findByAllPathId(Long pathId);
}
