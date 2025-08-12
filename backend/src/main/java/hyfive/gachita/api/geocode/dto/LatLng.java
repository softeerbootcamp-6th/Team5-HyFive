package hyfive.gachita.api.geocode.dto;

public record LatLng(double lat, double lng) {

    @Override
    public String toString() {
        return String.format("%.15f,%.15f", lat, lng);
    }
}