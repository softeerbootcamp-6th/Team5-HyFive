package hyfive.gachita.application.node.dto;

import hyfive.gachita.client.geocode.dto.LatLng;

import java.util.List;

public record SegmentDto(
        Long startId,
        Long endId,
        int sequence,
        List<LatLng> points
) {
}
