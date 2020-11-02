package prodmaster.challenge.stockAPI.exception;

public class ItemNotFoundException extends Exception {
    public ItemNotFoundException(Long id) {
        super("Item not found with ID " + id);
    }
}
