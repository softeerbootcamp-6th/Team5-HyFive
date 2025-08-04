package hyfive.gachita.car;

import hyfive.gachita.center.Center;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "car")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "car_id", nullable = false, columnDefinition = "BIGINT")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id", nullable = false)
    private Center center;

    @NotNull
    @Column(name = "model_name", nullable = false, columnDefinition = "VARCHAR(255)")
    private String modelName;

    @NotNull
    @Column(name = "car_number", nullable = false, columnDefinition = "VARCHAR(255)")
    private String carNumber;

    @NotNull
    @Column(name = "capacity", nullable = false, columnDefinition = "INT")
    private Integer capacity;

    @NotNull
    @Column(name = "low_floor", nullable = false, columnDefinition = "BOOLEAN")
    private Boolean lowFloor;

    @Column(name = "car_image", columnDefinition = "VARCHAR(255)")
    private String carImage;

    @NotNull
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "del_yn", nullable = false, columnDefinition = "VARCHAR(50)")
    private DelYn delYn = DelYn.N;
}

