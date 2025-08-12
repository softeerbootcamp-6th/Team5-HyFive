package hyfive.gachita.api.kakao.dto.request;

import hyfive.gachita.api.kakao.dto.Location;
import lombok.Builder;

import java.util.List;

@Builder
public record DirectionsReq(
        Location origin,
        Location destination,
        List<Location> waypoints
) {}
