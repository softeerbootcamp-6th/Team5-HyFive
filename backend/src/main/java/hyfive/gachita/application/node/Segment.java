package hyfive.gachita.application.node;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "segment")
public class Segment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "segment_id", nullable = false, columnDefinition = "BIGINT")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "start_id")
    private Node startNode;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "end_id")
    private Node endNode;

    @Column(name = "duration", nullable = false, columnDefinition = "INT")
    private int duration;

    @Column(name = "sequence", nullable = false, columnDefinition = "INT")
    private int sequence;

    @OneToMany(mappedBy = "segment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Point> points = new ArrayList<>();
}
