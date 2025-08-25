package hyfive.gachita.application.rental;

import hyfive.gachita.application.car.Car;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
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

    @OneToMany(mappedBy = "rental", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<AvailableRental> availableList = new ArrayList<>();

    public void setAvailableRental(AvailableRental availableRental) {
        this.availableList.add(availableRental);
        availableRental.setRental(this);
    }
}

