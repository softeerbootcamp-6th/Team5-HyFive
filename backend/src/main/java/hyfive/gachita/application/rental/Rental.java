package hyfive.gachita.application.rental;

import hyfive.gachita.application.car.Car;
import hyfive.gachita.application.node.Node;
import hyfive.gachita.application.path.Path;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rental")
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rental_id", nullable = false, columnDefinition = "BIGINT")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    @NotNull
    @Column(name = "rental_date", nullable = false, columnDefinition = "DATE")
    private LocalDate rentalDate;

    @NotNull
    @Column(name = "rental_start_time", nullable = false, columnDefinition = "TIME")
    private LocalTime rentalStartTime;

    @NotNull
    @Column(name = "rental_end_time", nullable = false, columnDefinition = "TIME")
    private LocalTime rentalEndTime;

    @OneToMany(mappedBy = "rental", fetch = FetchType.LAZY)
    private List<Path> pathList;
}

