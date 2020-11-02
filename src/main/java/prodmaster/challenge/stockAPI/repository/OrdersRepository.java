package prodmaster.challenge.stockAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prodmaster.challenge.stockAPI.models.Item;
import prodmaster.challenge.stockAPI.models.Orders;


import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByOrderCompleted(boolean orderCompleted);
}

