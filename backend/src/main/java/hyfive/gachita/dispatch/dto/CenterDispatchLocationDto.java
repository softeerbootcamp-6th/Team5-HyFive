package hyfive.gachita.dispatch.dto;

public record CenterDispatchLocationDto(
        Long id,
        double lat,
        double lng
) implements DispatchLocation {}
