package hyfive.gachita.domain.path.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "point")
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "path_segment_id")
    private PathSegment pathSegment;

    @Column(name = "lat", nullable = false,  columnDefinition = "DECIMAL(18,15)")
    private double lat;

    @Column(name = "lng", nullable = false,  columnDefinition = "DECIMAL(18,15)")
    private double lng;
}
