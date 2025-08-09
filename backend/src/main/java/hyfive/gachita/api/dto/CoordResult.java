package hyfive.gachita.api.dto;


public record CoordResult(String crs, Point point) {

    public record Point(String x, String y) {}

}
