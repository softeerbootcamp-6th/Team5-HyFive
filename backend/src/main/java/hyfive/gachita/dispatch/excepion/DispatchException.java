package hyfive.gachita.dispatch.excepion;

public class DispatchException extends RuntimeException {
    private final DispatchErrorCode errorCode;

    public DispatchException(String message) {
        super(message);
        this.errorCode = DispatchErrorCode.DISPATCH_ERROR;
    }

    public DispatchException(DispatchErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public DispatchErrorCode getErrorCode() {
        return errorCode;
    }
}
