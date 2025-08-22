package hyfive.gachita.dispatch.dto;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.path.Path;
import hyfive.gachita.application.path.PathService;

public interface DispatchResult {
    Path apply(PathService pathService, Book newBook);
}
