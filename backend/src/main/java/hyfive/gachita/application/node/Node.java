package hyfive.gachita.application.node;

import hyfive.gachita.application.path.Path;
import hyfive.gachita.application.book.Book;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "node")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Node {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "node_id", nullable = false, columnDefinition = "BIGINT")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "path_id", nullable = false)
    private Path path;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @NotNull
    @Column(name = "lat", nullable = false, columnDefinition = "DECIMAL(18,15)")
    private double lat;

    @NotNull
    @Column(name = "lng", nullable = false, columnDefinition = "DECIMAL(18,15)")
    private double lng;

    @NotNull
    @Column(name = "time", nullable = false, columnDefinition = "TIME")
    private LocalTime time;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, columnDefinition = "VARCHAR(50)")
    private NodeType type;
}

