package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.book.Book;
import lombok.Builder;

@Builder
public record FilteredPathDto(
        Long pathId,
        double latt,
        double lngg
) implements FilterDto {

    public static FilteredPathDto fromStart(Book book) {
        return FilteredPathDto.builder()
                .pathId(book.getPath().getId())
                .latt(book.getStartLat())
                .lngg(book.getStartLng())
                .build();
    }

    public static FilteredPathDto fromEnd(Book book) {
        return FilteredPathDto.builder()
                .pathId(book.getPath().getId())
                .latt(book.getEndLat())
                .lngg(book.getEndLng())
                .build();
    }

    @Override
    public Long id() { return this.pathId(); };

    @Override
    public double lat() { return this.lat(); };

    @Override
    public double lng() { return this.lng(); };
}
