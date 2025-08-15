package hyfive.gachita.dispatch.provider;

import hyfive.gachita.dispatch.dto.DispatchLocation;

import java.util.List;

/**
 * 요약 : 배차 시스템 dto로 변경해주는 Provider
 * 설명 : 배차 시스템 작동을 위해 필요한 정보를 DispatchLocation 타입으로 변경해줍니다
 * 사용 방법 :
 *  - DispatchLocationProvider interface를 구현
 */
public interface DispatchLocationProvider {
    List<DispatchLocation> getAll();
}
