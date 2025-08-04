package hyfive.gachita.center;

import hyfive.gachita.car.Car;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "center")
public class Center {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "center_id", nullable = false, columnDefinition = "BIGINT")
    private Long id;

    @NotNull
    @Column(name = "center_name", nullable = false, columnDefinition = "VARCHAR(255)")
    private String centerName;

    @NotNull
    @Column(name = "center_tel", nullable = false, columnDefinition = "VARCHAR(255)")
    private String centerTel;

    @NotNull
    @Column(name = "center_addr", nullable = false, columnDefinition = "VARCHAR(255)")
    private String centerAddr;

    @NotNull
    @Column(name = "lat", nullable = false, columnDefinition = "DECIMAL(18,15)")
    private double lat;

    @NotNull
    @Column(name = "lng", nullable = false, columnDefinition = "DECIMAL(18,15)")
    private double lng;

    @NotNull
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "center", fetch = FetchType.LAZY)
    private List<Car> carList;
}

