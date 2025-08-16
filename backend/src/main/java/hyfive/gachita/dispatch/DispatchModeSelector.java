package hyfive.gachita.dispatch;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.book.BookService;
import hyfive.gachita.application.book.BookStatus;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.module.evaluation.DrivingTimeEvaluation;
import hyfive.gachita.dispatch.module.evaluation.dto.DrivingTimeEvaluationResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * 배차 모드 선택
 * 1) NewPathDispatchFlow : 신규 경로 배차 플로우
 * 2) OldPathDispatchFlow : 기존 경로 배차 플로우
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DispatchModeSelector {

    private final DrivingTimeEvaluation drivingTimeEvaluation;
    private final BookService bookService;

    public void execute(Book newBook){
        DrivingTimeEvaluationResult result = drivingTimeEvaluation.evaluate(newBook);

        if(!result.success()){
            bookService.updateBookStatus(newBook.getId(), BookStatus.FAIL);
            log.info("예약 실패 : {}", result.failReason());
            // TODO : 비즈니스 예외는 아니어서 어떻게 처리하면 좋을지.
            return;
        }

        NewBookDto newBookDto = result.bookDto();

    };
}
