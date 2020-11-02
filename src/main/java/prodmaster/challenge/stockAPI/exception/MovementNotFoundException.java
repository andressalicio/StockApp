package prodmaster.challenge.stockAPI.exception;

public class MovementNotFoundException extends Exception {
    public MovementNotFoundException(Long id) {
        super("Item not found with ID " + id);
    }
}
