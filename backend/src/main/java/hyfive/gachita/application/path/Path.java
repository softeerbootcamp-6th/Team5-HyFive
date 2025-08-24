package hyfive.gachita.application.path;

import hyfive.gachita.application.book.Book;
import hyfive.gachita.application.car.Car;
import hyfive.gachita.application.node.Node;
import hyfive.gachita.application.rental.AvailableRental;
import hyfive.gachita.application.rental.Rental;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "path")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Path {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "path_id", nullable = false, columnDefinition = "BIGINT")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    // TODO : 제거 필요(AvailableRental로 대체)
//    @NotNull
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "rental_id", nullable = false)
//    private Rental rental;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "available_rental_id", nullable = false)
    private AvailableRental availableRental;

    @NotNull
    @Column(name = "maybe_start_time", nullable = false, columnDefinition = "TIME")
    private LocalTime maybeStartTime;

    @NotNull
    @Column(name = "maybe_end_time", nullable = false, columnDefinition = "TIME")
    private LocalTime maybeEndTime;

    @NotNull
    @Column(name = "real_start_time", nullable = false, columnDefinition = "TIME")
    private LocalTime realStartTime;

    @NotNull
    @Column(name = "real_end_time", nullable = false, columnDefinition = "TIME")
    private LocalTime realEndTime;

    @NotNull
    @Column(name = "drive_date", nullable = false, columnDefinition = "DATE")
    private LocalDate driveDate;

    @NotNull
    @Column(name = "start_addr", nullable = false, columnDefinition = "VARCHAR(255)")
    private String startAddr;

    @NotNull
    @Column(name = "end_addr", nullable = false, columnDefinition = "VARCHAR(255)")
    private String endAddr;

    @NotNull
    @Column(name = "user_count", nullable = false, columnDefinition = "INT")
    private int userCount;

    @Builder.Default
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "drive_status", nullable = false, columnDefinition = "VARCHAR(50)")
    private DriveStatus driveStatus = DriveStatus.WAITING;

    @OneToMany(mappedBy = "path", fetch = FetchType.LAZY, cascade=CascadeType.ALL)
    private List<Node> nodeList;

    @OneToMany(mappedBy = "path", fetch = FetchType.LAZY)
    private List<Book> bookList;

    public void setNodes(List<Node> nodeList) {
        this.nodeList = nodeList;
    }

    // 기존 경로 배차 update
    public void update(LocalTime maybeEndTime, LocalTime realEndTime, String endAddr) {
        this.maybeEndTime = maybeEndTime;
        this.realEndTime = realEndTime;
        this.endAddr = endAddr;
        this.userCount += 1;
    }
}
