package hyfive.gachita.application.book;

import hyfive.gachita.application.node.Node;
import hyfive.gachita.application.path.Path;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "book")
@ToString
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id", nullable = false, columnDefinition = "BIGINT")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "path_id")
    private Path path;

    @NotNull
    @Column(name = "book_name", nullable = false, columnDefinition = "VARCHAR(255)")
    private String bookName;

    @NotNull
    @Column(name = "book_tel", nullable = false, columnDefinition = "VARCHAR(255)")
    private String bookTel;

    @NotNull
    @Column(name = "hospital_date", nullable = false, columnDefinition = "DATE")
    private LocalDate hospitalDate;

    @NotNull
    @Column(name = "start_addr", nullable = false, columnDefinition = "VARCHAR(255)")
    private String startAddr;

    @NotNull
    @Column(name = "end_addr", nullable = false, columnDefinition = "VARCHAR(255)")
    private String endAddr;

    @NotNull
    @Column(name = "walker", nullable = false, columnDefinition = "BOOLEAN")
    private Boolean walker;

    @NotNull
    @Column(name = "hospital_time", nullable = false, columnDefinition = "TIME")
    private LocalTime hospitalTime;

    @NotNull
    @Column(name = "deadline", nullable = false, columnDefinition = "TIME")
    private LocalTime deadline;

    @NotNull
    @Column(name = "start_lat", nullable = false, columnDefinition = "DECIMAL(18,15)")
    private double startLat;

    @NotNull
    @Column(name = "start_lng", nullable = false, columnDefinition = "DECIMAL(18,15)")
    private double startLng;

    @NotNull
    @Column(name = "end_lat", nullable = false, columnDefinition = "DECIMAL(18,15)")
    private double endLat;

    @NotNull
    @Column(name = "end_lng", nullable = false, columnDefinition = "DECIMAL(18,15)")
    private double endLng;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "book_status", nullable = false, columnDefinition = "VARCHAR(50)")
    private BookStatus bookStatus;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
    private List<Node> nodeList;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    public void update(BookStatus bookStatus) {
        this.bookStatus = bookStatus;
    }

    public void setPath(Path path) {
        this.path = path;
    }
}

