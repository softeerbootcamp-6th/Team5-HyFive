package hyfive.gachita.book;

import lombok.Getter;

@Getter
public enum BookStatus {
    NEW("신규예약"),
    SUCCESS("예약성공"),
    FAIL("예약실패"),
    FIXED("경로확정");

    private String value;

    BookStatus(String value) {
        this.value = value;
    }
}