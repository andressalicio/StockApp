package prodmaster.challenge.stockAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prodmaster.challenge.stockAPI.models.Orders;
import prodmaster.challenge.stockAPI.models.OrdersMovementsStock;
import prodmaster.challenge.stockAPI.models.StockMovement;


import java.util.List;

public interface OrdersMovementStockRepository extends JpaRepository<OrdersMovementsStock, Long> {
    List<OrdersMovementsStock> findByOrders(Orders orders);
    List<OrdersMovementsStock> findByStockMovement(StockMovement stockMovement);
}
