package hyfive.gachita.dispatch.module.evaluation;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.client.geocode.dto.LatLng;
import hyfive.gachita.client.kakao.KakaoNaviService;
import hyfive.gachita.client.kakao.RouteInfo;
import hyfive.gachita.dispatch.dto.NewBookDto;
import hyfive.gachita.dispatch.module.evaluation.dto.DrivingTimeEvaluationResult;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class DrivingTimeEvaluationTest {

    private KakaoNaviService kakaoNaviService;
    private DrivingTimeEvaluation drivingTimeEvaluation;

    @BeforeEach
    void setUp() {
        kakaoNaviService = mock(KakaoNaviService.class);
        drivingTimeEvaluation = new DrivingTimeEvaluation(kakaoNaviService);
    }

    @Test
    void 총운행시간이_3600초를_초과하면_실패를_반환한다() {
        // given
        Book mockBook = mock(Book.class);
        when(mockBook.getStartLat()).thenReturn(37.5665);
        when(mockBook.getStartLng()).thenReturn(126.9780);
        when(mockBook.getEndLat()).thenReturn(37.5770);
        when(mockBook.getEndLng()).thenReturn(126.9850);

        RouteInfo longRoute = mock(RouteInfo.class);
        when(longRoute.totalDuration()).thenReturn(4000); // 3600초 초과
        when(kakaoNaviService.geRouteInfo(anyList())).thenReturn(longRoute);

        // when
        DrivingTimeEvaluationResult result = drivingTimeEvaluation.evaluate(mockBook);

        // then
        assertThat(result.success()).isFalse();
        assertThat(result.failReason()).isEqualTo("총 운행시간 1시간 초과");
        assertThat(result.bookDto()).isNull();
    }

    @Test
    void 총운행시간이_3600초이하면_성공을_반환한다() {
        // given
        Book mockBook = mock(Book.class);
        when(mockBook.getStartLat()).thenReturn(37.5665);
        when(mockBook.getStartLng()).thenReturn(126.9780);
        when(mockBook.getEndLat()).thenReturn(37.5770);
        when(mockBook.getEndLng()).thenReturn(126.9850);

        RouteInfo shortRoute = mock(RouteInfo.class);
        when(shortRoute.totalDuration()).thenReturn(1800); // 30분
        when(kakaoNaviService.geRouteInfo(anyList())).thenReturn(shortRoute);

        // when
        DrivingTimeEvaluationResult result = drivingTimeEvaluation.evaluate(mockBook);

        // then
        assertThat(result.success()).isTrue();
        assertThat(result.bookDto()).isNotNull();
        assertThat(result.failReason()).isNull();
    }
}
