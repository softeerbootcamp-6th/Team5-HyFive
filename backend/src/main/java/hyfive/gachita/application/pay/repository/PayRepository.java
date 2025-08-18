package hyfive.gachita.application.pay.repository;

import hyfive.gachita.application.pay.Pay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PayRepository extends JpaRepository<Pay, Long>, CustomPayRepository {
}
