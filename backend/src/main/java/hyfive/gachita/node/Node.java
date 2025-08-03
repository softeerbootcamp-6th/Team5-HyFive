package hyfive.gachita.node;

import hyfive.gachita.path.Path;
import hyfive.gachita.book.Book;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "node")
public class Node {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "node_id", nullable = false, columnDefinition = "BIGINT")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "path_id", nullable = false)
    private Path path;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @NotNull
    @Column(name = "lat", nullable = false, columnDefinition = "DECIMAL(9,6)")
    private double lat;

    @NotNull
    @Column(name = "lon", nullable = false, columnDefinition = "DECIMAL(9,6)")
    private double lon;

    @NotNull
    @Column(name = "time", nullable = false, columnDefinition = "TIME")
    private LocalTime time;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, columnDefinition = "VARCHAR(50)")
    private NodeType type;
}

