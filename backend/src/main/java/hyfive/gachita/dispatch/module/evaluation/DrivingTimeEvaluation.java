package hyfive.gachita.dispatch.module.evaluation;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.client.geocode.dto.LatLng;
import hyfive.gachita.client.kakao.KakaoNaviService;
import hyfive.gachita.client.kakao.RouteInfo;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.excepion.DispatchException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 신규 예약 운행 시간 평가 모듈
 */
@Component
@RequiredArgsConstructor
public class DrivingTimeEvaluation {

    private final int MAX_TOTAL_DURATION = 3600;

    private final KakaoNaviService kakaoNaviService;

    public NewBookDto evaluate(Book newBook) {
        List<LatLng> nodeList = List.of(
                new LatLng(newBook.getStartLat(), newBook.getStartLng()),
                new LatLng(newBook.getEndLat(), newBook.getEndLng())
        );

        RouteInfo routeInfo = kakaoNaviService.geRouteInfo(nodeList);

        if(routeInfo.totalDuration() > MAX_TOTAL_DURATION) {
            throw new DispatchException("총 운행시간 1시간 초과");
        }

        return NewBookDto.from(newBook, routeInfo);
    }
}
