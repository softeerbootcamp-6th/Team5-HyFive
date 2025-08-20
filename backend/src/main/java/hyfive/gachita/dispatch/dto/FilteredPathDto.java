package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.book.Book;
import lombok.Builder;

@Builder
public record FilteredPathDto(
        Long pathId,
        double lat,
        double lng
) implements FilterDto {

    public static FilteredPathDto fromStart(Book book) {
        return FilteredPathDto.builder()
                .pathId(book.getPath().getId())
                .lat(book.getStartLat())
                .lng(book.getStartLng())
                .build();
    }

    public static FilteredPathDto fromEnd(Book book) {
        return FilteredPathDto.builder()
                .pathId(book.getPath().getId())
                .lat(book.getEndLat())
                .lng(book.getEndLng())
                .build();
    }

    @Override
    public Long id() { return this.pathId(); };

    @Override
    public double lat() { return this.lat(); };

    @Override
    public double lng() { return this.lng(); };
}
