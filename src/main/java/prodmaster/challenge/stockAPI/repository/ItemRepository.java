package prodmaster.challenge.stockAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prodmaster.challenge.stockAPI.models.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {

}
