package hyfive.gachita.client.kakao.dto.request;

import hyfive.gachita.client.kakao.dto.Location;
import lombok.Builder;

import java.util.List;

@Builder
public record DirectionsReq(
        Location origin,
        Location destination,
        List<Location> waypoints
) {}
