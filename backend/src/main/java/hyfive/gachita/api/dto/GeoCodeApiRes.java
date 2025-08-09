package hyfive.gachita.api.dto;

public record GeoCodeApiRes<T>(ResponseWrapper<T> response) {

    public record ResponseWrapper<T>(String status, T result, ErrorDetails error) {}

    public record ErrorDetails(String code, String text) {}

}