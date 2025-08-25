package hyfive.gachita.application.path.dto;

import hyfive.gachita.client.kakao.dto.response.KakaoNaviRes;

public record BoundRes(
        double minLng,
        double minLat,
        double maxLng,
        double maxLat
) {
    public static BoundRes from(KakaoNaviRes.Bound bound) {
        return new BoundRes(
                bound.minX(),
                bound.minY(),
                bound.maxX(),
                bound.maxY()
        );
    }
}