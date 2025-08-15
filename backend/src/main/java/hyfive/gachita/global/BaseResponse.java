package hyfive.gachita.global;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Builder;
import lombok.Getter;

import static hyfive.gachita.global.ErrorCode.SUCCESS;

@Builder
@Getter
@JsonPropertyOrder({"isSuccess", "code", "message", "data"})
public class BaseResponse<T> {

    private final Boolean isSuccess;
    private final String message;
    private final int code;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

    public static <T> BaseResponse<T> success(T data) {
        return BaseResponse.<T>builder()
                .isSuccess(SUCCESS.isSuccess())
                .message(SUCCESS.getMessage())
                .code(SUCCESS.getCode())
                .data(data)
                .build();
    }

    public static <T> BaseResponse<T> fail(ErrorCode errorCode) {
        return BaseResponse.<T>builder()
                .isSuccess(errorCode.isSuccess())
                .message(errorCode.getMessage())
                .code(errorCode.getCode())
                .data(null)
                .build();
    }

    public static <T> BaseResponse<T> fail(ErrorCode errorCode, String message) {
        return BaseResponse.<T>builder()
                .isSuccess(errorCode.isSuccess())
                .message(message)
                .code(errorCode.getCode())
                .data(null)
                .build();
    }
}