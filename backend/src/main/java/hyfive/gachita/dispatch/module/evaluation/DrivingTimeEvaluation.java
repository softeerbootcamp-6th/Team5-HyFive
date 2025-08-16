package hyfive.gachita.dispatch.module.evaluation;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.book.BookService;
import hyfive.gachita.application.book.BookStatus;
import hyfive.gachita.client.geocode.dto.LatLng;
import hyfive.gachita.client.kakao.KakaoNaviService;
import hyfive.gachita.client.kakao.RouteInfo;
import hyfive.gachita.dispatch.dto.NewBookDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


/**
 * 신규 예약 운행 시간 평가 모듈
 */
@Component
@RequiredArgsConstructor
public class DrivingTimeEvaluation {

    private final int MAX_TOTAL_DURATION = 3600;

    private final KakaoNaviService kakaoNaviService;
    private final BookService bookService;

    public void evaluate(Book newBook){
        List<LatLng> nodeList = new ArrayList<>();
        nodeList.add(new LatLng(newBook.getStartLat(), newBook.getStartLng()));
        nodeList.add(new LatLng(newBook.getEndLat(), newBook.getEndLng()));

        RouteInfo newBookRouteInfo = kakaoNaviService.geRouteInfo(nodeList);

        if(newBookRouteInfo.totalDuration() > MAX_TOTAL_DURATION) {
            // 예약 실패
            bookService.updateBookStatus(newBook.getId(), BookStatus.FAIL);
        } else {
            // TODO : DispatchModeSelector 실행
            NewBookDto newBookDto = NewBookDto.from(newBook, newBookRouteInfo);
        }
    }
}
