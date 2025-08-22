package hyfive.gachita.application.path.respository;

import hyfive.gachita.application.node.Node;
import hyfive.gachita.application.path.DriveStatus;
import hyfive.gachita.application.path.Path;
import hyfive.gachita.application.path.dto.PathCursor;
import hyfive.gachita.dispatch.dto.OldPathDto;
import hyfive.gachita.dispatch.module.condition.PathCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CustomPathRepository {
    List<OldPathDto> searchPathList(PathCondition condition);
    Path findPassengersByPathId(Long pathId);
    List<Path> findPathsForScroll(LocalDate date, DriveStatus status, PathCursor cursor, int size);
    Page<Path> searchPathPageByCondition(Pair<LocalDate, LocalDate> dateRange,
                                         DriveStatus status,
                                         Pageable pageable);
    Optional<List<Node>> findNodeListWithSegmentInfoByPathId(Long id);
}
