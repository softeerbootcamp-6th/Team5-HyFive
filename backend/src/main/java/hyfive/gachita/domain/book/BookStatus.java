package hyfive.gachita.domain.book;

import lombok.Getter;

@Getter
public enum BookStatus {
    NEW,
    SUCCESS,
    FAIL,
    FIXED
}