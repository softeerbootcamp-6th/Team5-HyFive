package hyfive.gachita.dispatch;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * 배차 모드 선택
 * 1) NewPathDispatchFlow : 신규 경로 배차 플로우
 * 2) OldPathDispatchFlow : 기존 경로 배차 플로우
 */
@Component
@RequiredArgsConstructor
public class DispatchModeSelector {

    public void execute(){

    };
}
