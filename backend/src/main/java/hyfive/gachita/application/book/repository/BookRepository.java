package hyfive.gachita.application.book.repository;

import hyfive.gachita.application.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface BookRepository extends JpaRepository<Book, Long>, CustomBookRepository {

    boolean existsBookByBookTelAndHospitalDate(String bookTel, LocalDate hospitalDate);
}
