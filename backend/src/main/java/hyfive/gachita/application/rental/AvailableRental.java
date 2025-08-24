package hyfive.gachita.application.rental;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;

@Entity

@Table(name = "available_rental")
public class AvailableRental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "available_rental_id", nullable = false, columnDefinition = "BIGINT")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rental_id", nullable = false)
    private Rental rental;

    @NotNull
    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @NotNull
    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

}
