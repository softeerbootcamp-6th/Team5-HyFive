package hyfive.gachita.api.geocode.dto;

public record GeoCodeApiRes<T>(ResponseWrapper<T> response) {

    public record ResponseWrapper<T>(
            String status,  // OK(성공), NOT_FOUND(결과없음), ERROR(에러)
            T result, ErrorDetails error) {}

    public record ErrorDetails(String code, String text) {}

}