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
public class StockMovement {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String creationDate;

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    @OneToOne
    private Item item;

    @Column(nullable = false)
    private Double quantity;

    public Double getCurrentQuantity() {
        return currentQuantity;
    }

    public void setCurrentQuantity(Double currentQuantity) {
        this.currentQuantity = currentQuantity;
    }

    @Column(nullable = true)
    private Double currentQuantity;

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
    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

}
