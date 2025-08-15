package hyfive.gachita.domain.pay.repository;

import hyfive.gachita.domain.pay.Pay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PayRepository extends JpaRepository<Pay, Long>, CustomPayRepository {
}
