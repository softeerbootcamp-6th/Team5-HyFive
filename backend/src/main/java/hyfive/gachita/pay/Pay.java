package hyfive.gachita.pay;

import hyfive.gachita.book.Book;
import hyfive.gachita.center.Center;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "pay")
public class Pay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pay_id", nullable = false, columnDefinition = "BIGINT")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id", nullable = false)
    private Center center;

    @NotNull
    @Column(name = "amount", nullable = false, columnDefinition = "INT")
    private int amount = 0;

    @NotNull
    @Column(name = "pay_date", nullable = false, columnDefinition = "DATE")
    private LocalDate payDate;
}
