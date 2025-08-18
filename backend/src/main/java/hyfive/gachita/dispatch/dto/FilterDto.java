package hyfive.gachita.dispatch.dto;

/**
 * 요약 : 필터링을 해야하는 데이터 인터페이스
 * 설명 : 필터링 모듈 작동을 위해 필요한 최소 정보를 정의합니다
 * 사용 방법 :
 *  - FilterDto interface를 구현하여 Entity 별로 필요한 필드를 추가합니다
 *  - (예시) PathUnDispatchDto.java
 */
public interface FilterDto {
    Long id();
    double lat();
    double lng();
}
