package prodmaster.challenge.stockAPI.exception;

public class OrdersNotFoundException extends Exception{
    public OrdersNotFoundException(Long id) {
        super("Orders not found with ID " + id);
    }
}
