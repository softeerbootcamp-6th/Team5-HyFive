package hyfive.gachita.global;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Hidden
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<BaseResponse<?>> handleBusinessException(BusinessException e) {
        log.info("BusinessException : {}", e.getMessage());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(BaseResponse.fail(e.getErrorCode(), e.getMessage()));
    }

    // @Valid, @Validated 등의 유효성 검사 실패 시 발생
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<BaseResponse<?>> handleConstraintViolationException(MethodArgumentNotValidException e) {
        String errorMessages = e.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .reduce((msg1, msg2) -> msg1 + ", " + msg2)
                .orElse("입력값이 올바르지 않습니다.");

        log.info("MethodArgumentNotValidException : {}", errorMessages);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(BaseResponse.fail(ErrorCode.INVALID_INPUT));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponse<?>> handleException(Exception e) {
        ErrorCode errorCode = ErrorCode.findByException(e);

        if (errorCode == null) {
            log.error("{}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponse.fail(ErrorCode.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
        log.info("{}", e.getMessage());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(BaseResponse.fail(errorCode));
    }
}
