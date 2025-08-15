package hyfive.gachita.domain.path.domain;

import hyfive.gachita.domain.node.Node;
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
@Table(name = "path_segment")
public class PathSegment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "start_id")
    private Node startNode;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "end_id")
    private Node endNode;

    @Column(name = "duration", nullable = false, columnDefinition = "INT")
    private int duration;

    @OneToMany(mappedBy = "pathSegment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Point> points = new ArrayList<>();
}
