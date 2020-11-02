package prodmaster.challenge.stockAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prodmaster.challenge.stockAPI.models.Item;

import prodmaster.challenge.stockAPI.models.StockMovement;

import java.util.List;


public interface MovementRepository extends JpaRepository<StockMovement, Long> {
    List<StockMovement> findByItem(Item item);
}
