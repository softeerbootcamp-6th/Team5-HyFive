package hyfive.gachita.path;

import lombok.Getter;

@Getter
public enum DriveStatus {
    WAITING("운행대기"),
    RUNNING("운행중"),
    FINISHED("운행완료");

    private final String value;

    DriveStatus(String value) {
        this.value = value;
    }
}
