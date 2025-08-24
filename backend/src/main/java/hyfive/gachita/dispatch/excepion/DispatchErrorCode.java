package hyfive.gachita.dispatch.excepion;

import lombok.Getter;

@Getter
public enum DispatchErrorCode {

    /*8000*/
    DISPATCH_ERROR(8000, "배차 중 에러가 발생했습니다."),
    CANDIDATE_EMPTY(8001, "배차 후보가 존재하지 않습니다.");

    private final int code;
    private final String message;

    DispatchErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
