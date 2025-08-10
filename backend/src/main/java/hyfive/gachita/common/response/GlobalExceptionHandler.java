package hyfive.gachita.common.response;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@Hidden
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<BaseResponse<?>> handleBusinessException(BusinessException e) {
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

        log.debug(errorMessages);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(BaseResponse.fail(ErrorCode.INVALID_INPUT, errorMessages));
    }

     // HttpMessageNotReadableException : 요청 본문(JSON 등)의 파싱에 실패한 경우
     // MissingServletRequestParameterException : 필수 요청 파라미터(@RequestParam)가 누락된 경우
    @ExceptionHandler({ HttpMessageNotReadableException.class, MissingServletRequestParameterException.class })
    public ResponseEntity<BaseResponse<?>> handleBadRequestExceptions(Exception e) {
        log.debug(e.getMessage());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(BaseResponse.fail(ErrorCode.INVALID_INPUT));
    }

    // multipart 업로드 사이즈 초과 시 발생
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<BaseResponse<?>> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(BaseResponse.fail(ErrorCode.MAX_UPLOAD_SIZE_EXCEEDED));
    }

}
