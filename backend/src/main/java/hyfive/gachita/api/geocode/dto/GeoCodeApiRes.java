package hyfive.gachita.api.geocode.dto;

public record GeoCodeApiRes<T>(ResponseWrapper<T> response) {

    public record ResponseWrapper<T>(String status, T result, ErrorDetails error) {}

    public record ErrorDetails(String code, String text) {}

}