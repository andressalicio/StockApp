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
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String creationDate;
    @OneToOne
    private Item item;

    @Column(nullable = false)
    private String quantity;

    @OneToOne
    private  User user;

    @Column(nullable = true)
    private boolean orderCompleted;

    @Column(nullable = true)
    private Double quantityToComplete;

    public Double getQuantityToComplete() {
        return quantityToComplete;
    }

    public void setQuantityToComplete(Double quantityToComplete) {
        this.quantityToComplete = quantityToComplete;
    }

    public boolean isOrderCompleted() {
        return orderCompleted;
    }

    public void setOrderCompleted(boolean orderCompleted) {
        this.orderCompleted = orderCompleted;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }



}
