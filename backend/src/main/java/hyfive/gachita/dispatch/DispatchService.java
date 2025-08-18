package hyfive.gachita.dispatch;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.book.BookCompletedEvent;
import hyfive.gachita.application.book.BookService;
import hyfive.gachita.application.book.BookStatus;
import hyfive.gachita.application.path.PathService;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.excepion.DispatchException;
import hyfive.gachita.dispatch.module.evaluation.DrivingTimeEvaluation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class DispatchService {
    private final DispatchFlowSelector dispatchFlowSelector;
    private final NewPathDispatchFlow newPathDispatchFlow;
    private final OldPathDispatchFlow oldPathDispatchFlow;
    private final BookService bookService;
    private final PathService pathService;

    // evaluation
    private final DrivingTimeEvaluation drivingTimeEvaluation;

    @Async
    @EventListener(BookCompletedEvent.class)
    public void execute(BookCompletedEvent bookCompletedEvent) {
        Book newBook = bookCompletedEvent.book();
        log.info("예약 배차 시작 {}", newBook);
        BookStatus bookStatus = BookStatus.NEW;
        try {
            // 1. 예약 추가 정보 로드
            NewBookDto newBookDto = drivingTimeEvaluation.evaluate(newBook);

            // 2. DispatchFlowSelector 실행
            dispatchFlowSelector.execute(newBookDto);

            // 3. 배차 결과 반영
            bookStatus = BookStatus.SUCCESS;

        } catch (Exception e) {
            bookStatus = BookStatus.FAIL;
            if (e instanceof DispatchException) {
                log.info("비정상 예약 실패 {}", e.getMessage());
            } else {
                log.error("비정상 예약 실패 {}", e.getMessage());
            }
        } finally {
            // BookStatus 변환 - 성공, 실패
            bookService.updateBookStatus(newBook.getId(), bookStatus);
        }
    }
}
