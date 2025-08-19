package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.center.Center;
import lombok.Builder;

import java.time.LocalTime;

@Builder
public record FilteredCenterDto(
        Long centerId,
        double centerLat,
        double centerLng,
        Long carId,

        LocalTime maybeOnTime, // 예상 탑승 시간 (deadline - bookDuration)
        LocalTime deadline,    // 마지노선 하차 시간
        int duration,          // 총 이동 시간 (단위 : sec)
        int distance           // 총 이동 거리 (단위 : meters)
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
