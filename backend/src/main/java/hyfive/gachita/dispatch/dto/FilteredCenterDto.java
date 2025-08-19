package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.center.Center;
import lombok.Builder;

import java.time.LocalTime;

@Builder
public record FilteredCenterDto(
        Long centerId,
        double centerLat,
        double centerLng
) implements FilterDto {

    public static FilteredCenterDto from(Center center) {
        return FilteredCenterDto.builder()
                .centerId(center.getId())
                .centerLat(center.getLat())
                .centerLng(center.getLng())
                .build();
    }

    @Override
    public Long id() {
        return this.centerId();
    };

    @Override
    public double lat() {
        return this.centerLat();
    };

    @Override
    public double lng() {
        return this.centerLng();
    };
}
