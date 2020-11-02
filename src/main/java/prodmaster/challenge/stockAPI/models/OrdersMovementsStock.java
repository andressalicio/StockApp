package prodmaster.challenge.stockAPI.models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrdersMovementsStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Orders orders;

    @OneToOne
    private StockMovement stockMovement;

    @Column(nullable = false)
    private Double quantity;

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Orders getOrders() {
        return orders;
    }

    public void setOrders(Orders orders) {
        this.orders = orders;
    }

    public StockMovement getStockMovement() {
        return stockMovement;
    }

    public void setStockMovement(StockMovement stockMovement) {
        this.stockMovement = stockMovement;
    }


}
