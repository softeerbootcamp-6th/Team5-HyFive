package hyfive.gachita.book;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface BookRepository extends JpaRepository<Book, Long> {

    boolean existsBookByBookTelAndHospitalDate(String bookTel, LocalDate hospitalDate);
}
