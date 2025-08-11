package hyfive.gachita.api.geocode.dto;

public record GeoCodeReq(
        String request,
        String address,
        String point
) {
    // 주소 -> 좌표용 팩토리 메서드
    public static GeoCodeReq forCoord(String address) {
        return new GeoCodeReq("getCoord", address, null);
    }

    // 좌표 -> 주소용 팩토리 메서드
    public static GeoCodeReq forAddress(String point) {
        return new GeoCodeReq("getAddress", null, point);
    }
}