package hyfive.gachita.application.path.respository;

import hyfive.gachita.application.path.DriveStatus;
import hyfive.gachita.application.path.Path;
import hyfive.gachita.application.path.dto.PathCursor;
import hyfive.gachita.application.path.dto.PathRes;
import hyfive.gachita.dispatch.dto.OldPathDto;
import hyfive.gachita.dispatch.module.condition.PathCondition;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CustomPathRepository {
    List<OldPathDto> searchPathList(PathCondition condition);
    Optional<PathRes> findPathResByBookId(Long bookId);
    List<Path> findPathsForScroll(LocalDate date, DriveStatus status, PathCursor cursor, int size);
}
