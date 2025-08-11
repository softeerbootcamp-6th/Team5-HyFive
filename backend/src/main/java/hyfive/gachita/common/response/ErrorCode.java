package hyfive.gachita.common.response;

import lombok.Getter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.Arrays;
import java.util.List;

@Getter
public enum ErrorCode {
    /*성공 1000*/
    SUCCESS(true, 1000, "요청에 성공했습니다."),

    /*공통 2000*/
    INVALID_INPUT(false, 2000, "잘못된 입력값입니다.",
            HttpMessageNotReadableException.class,
            MissingServletRequestParameterException.class
    ),
    METHOD_NOT_ALLOWED(false, 2001, "잘못된 호출입니다."),
    HANDLE_ACCESS_DENIED(false, 2002, "접근할 수 없습니다."),
    INTERNAL_SERVER_ERROR(false, 2003, "서버 내부 문제가 발생했습니다."),
    EMPTY_DATA(false, 2004, "비어 있는 값을 주셨습니다."),
    EXTERNAL_API_ERROR(false, 2005, "외부 API 호출 중 오류가 발생했습니다."),
    UNKNOWN_ERROR(false, 2006, "알수 없는 에러가 발생했습니다."),

    /*서버, DB, s3 3000*/
    DATABASE_ERROR(false, 3000, "DB에 문제가 발생했습니다."),
    NO_EXIST_VALUE(false, 3001, "DB에 데이터가 존재하지 않습니다."),
    EMPTY_FILE(false, 3002, "S3 업로드 실패 - 빈 파일을 주셨습니다."),
    FILE_TYPE_NOT_ALLOWED(false, 3003, "허용되지 않은 확장자 입니다."),
    FILE_DELETE_FAIL(false, 3004, "S3 이미지 삭제에 실패했습니다."),
    MAX_UPLOAD_SIZE_EXCEEDED(false, 3005, "파일 사이즈는 최대 10MB 까지 업로드 할 수 있습니다.",
            MaxUploadSizeExceededException.class
    ),

    /*차량 4500*/
    MAX_CAR_COUNT_EXCEEDED(false, 4500, "등록 가능한 최대 차량 수는 6대 입니다."),
    DUPLICATE_CAR_NUMBER(false, 4501, "동일한 차량 번호를 가진 차량이 존재합니다."),

    /*예약 5000*/
    DUPLICATE_BOOK_DATE(false, 5000, "동일한 사용자에 의해 이미 예약된 날짜입니다."),

    /*유휴 시간 6000*/
    INVALID_DURATION(false, 6000, "유휴시간은 최소 2시간 이상이어야 합니다.");

    private final boolean isSuccess;
    private final int code;
    private final String message;
    private final List<Class<? extends Exception>> exceptionClasses;

    ErrorCode(boolean isSuccess, int code, String message, Class<? extends Exception>... exceptionClasses) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
        this.exceptionClasses = List.of(exceptionClasses);
    }

    public static ErrorCode findByException(Exception e) {
        return Arrays.stream(ErrorCode.values())
                .filter(errorCode -> errorCode.hasExceptionClass(e))
                .findFirst()
                .orElse(null);
    }

    private boolean hasExceptionClass(Exception e) {
        return exceptionClasses.stream()
                .anyMatch(exceptionClass -> exceptionClass.isInstance(e));
    }
}