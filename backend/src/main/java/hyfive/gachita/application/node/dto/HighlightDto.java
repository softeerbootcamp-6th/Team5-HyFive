package hyfive.gachita.application.node.dto;

public record HighlightDto(
        Long bookId,
        double startLat,
        double startLng,
        double endLat,
        double endLng,
        int startSeq,
        int endSeq
) {}
