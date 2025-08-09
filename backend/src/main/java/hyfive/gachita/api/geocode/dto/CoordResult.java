package hyfive.gachita.api.geocode.dto;


public record CoordResult(String crs, Point point) {

    public record Point(String x, String y) {}

}
