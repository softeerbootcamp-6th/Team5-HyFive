package hyfive.gachita.dispatch.dto;

import hyfive.gachita.center.Center;

public record CenterDispatchLocationDto(
        Long id,
        double lat,
        double lng
) implements DispatchLocation {
    public static CenterDispatchLocationDto from(Center center) {
        return new CenterDispatchLocationDto(
                center.getId(),
                center.getLat(),
                center.getLng()
        );
    }
}
