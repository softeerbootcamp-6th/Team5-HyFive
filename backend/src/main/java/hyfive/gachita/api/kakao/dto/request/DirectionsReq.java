package hyfive.gachita.api.kakao.dto.request;

public record DirectionsReq(
        String origin,
        String destination
) {
    public static DirectionsReq of(String origin, String destination) {
        return new DirectionsReq(origin, destination);
    }
}
