package hyfive.gachita.dispatch;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.book.BookService;
import hyfive.gachita.application.book.BookStatus;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.dto.PathCandidateDto;
import hyfive.gachita.dispatch.module.condition.BoundingBoxCondition;
import hyfive.gachita.dispatch.module.condition.RadiusCondition;
import hyfive.gachita.dispatch.module.evaluation.DrivingTimeEvaluation;
import hyfive.gachita.dispatch.module.evaluation.dto.DrivingTimeEvaluationResult;
import hyfive.gachita.dispatch.module.filter.BoundingBoxFilter;
import hyfive.gachita.dispatch.module.filter.HaversineFilter;
import hyfive.gachita.dispatch.module.provider.PathCandidateProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * 배차 모드 선택
 * 1) NewPathDispatchFlow : 신규 경로 배차 플로우
 * 2) OldPathDispatchFlow : 기존 경로 배차 플로우
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DispatchModeSelector {

    private final int RADIUS_METERS = 500;
    private final DrivingTimeEvaluation drivingTimeEvaluation;
    private final BookService bookService;
    private final PathCandidateProvider pathCandidateProvider;
    private final BoundingBoxFilter boundingBoxFilter;
    private final HaversineFilter haversineFilter;

    public void execute(Book newBook){
        DrivingTimeEvaluationResult result = drivingTimeEvaluation.evaluate(newBook);

        if(!result.success()){
            bookService.updateBookStatus(newBook.getId(), BookStatus.FAIL);
            log.info("예약 실패 : {}", result.failReason());
            return;
        }

        NewBookDto newBookDto = result.bookDto();
        List<PathCandidateDto> candidates = pathCandidateProvider.getByCondition(newBookDto.hospitalDate());

        BoundingBoxCondition bbConditionStart = BoundingBoxCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);
        BoundingBoxCondition bbConditionEnd = BoundingBoxCondition.from(newBookDto.endLat(), newBookDto.endLng(), RADIUS_METERS);
        RadiusCondition rConditionStart = RadiusCondition.from(newBookDto.startLat(), newBookDto.startLng(), RADIUS_METERS);
        RadiusCondition rConditionEnd = RadiusCondition.from(newBookDto.endLat(), newBookDto.endLng(), RADIUS_METERS);

        // 1차 BoundingBox 필터 후 Haversine 필터 적용
        List<PathCandidateDto> hFilteredStart = haversineFilter.filter(
                boundingBoxFilter.filter(candidates, bbConditionStart),
                rConditionStart
        );

        List<PathCandidateDto> hFilteredEnd = haversineFilter.filter(
                boundingBoxFilter.filter(candidates, bbConditionEnd),
                rConditionEnd
        );

        // 합집합 PathId 추출
        Set<Long> candidatePathIds = Stream.concat(
                hFilteredStart.stream().map(PathCandidateDto::pathId),
                hFilteredEnd.stream().map(PathCandidateDto::pathId)
        ).collect(Collectors.toSet());

        if (candidatePathIds.isEmpty()) {
            log.info("신규 경로 배차 실행");
//            newPathDispatchFlow.execute(newBookDto);
        } else {
            log.info("기존 경로 배차 실행");
//            oldPathDispatchFlow.execute(new ArrayList<>(candidatePathIds), newBookDto);
        }
    }

}
