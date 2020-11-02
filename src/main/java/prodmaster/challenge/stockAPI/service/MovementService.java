package prodmaster.challenge.stockAPI.service;

import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


import prodmaster.challenge.stockAPI.exception.MovementNotFoundException;
import prodmaster.challenge.stockAPI.exception.OrdersNotFoundException;
import prodmaster.challenge.stockAPI.models.Orders;
import prodmaster.challenge.stockAPI.models.OrdersMovementsStock;
import prodmaster.challenge.stockAPI.models.StockMovement;
import prodmaster.challenge.stockAPI.repository.MovementRepository;
import prodmaster.challenge.stockAPI.repository.OrdersMovementStockRepository;
import prodmaster.challenge.stockAPI.repository.OrdersRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MovementService {
    private MovementRepository movementRepository;
    private OrdersRepository ordersRepository;
    private OrdersMovementStockRepository ordersMovementsStockRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    public MovementService(MovementRepository movementRepository, OrdersRepository ordersRepository, OrdersMovementStockRepository ordersMovementsStockRepository){
        this.movementRepository = movementRepository;
        this.ordersRepository = ordersRepository;
        this.ordersMovementsStockRepository = ordersMovementsStockRepository;
    }

    public List<OrdersMovementsStock> findStockMovementsByStockMovementId(Long id) throws OrdersNotFoundException {
        Optional<StockMovement> stockMovementOptional = movementRepository.findById(id);
        if (stockMovementOptional.isEmpty()){
            throw new OrdersNotFoundException(id);
        }
        List<OrdersMovementsStock> movements = ordersMovementsStockRepository.findByStockMovement(stockMovementOptional.get());
        return movements;
    }

    public StockMovement createMovement(@RequestBody StockMovement stockMovement){
        List<Orders> orders = ordersRepository.findByOrderCompleted(false);

        stockMovement.setCreationDate(getCurrentDate());
        StockMovement savedMovement = movementRepository.save(stockMovement);

        double currentQuantity = stockMovement.getQuantity();

        for (int i = 0; i < orders.size(); i++){
            if (orders.get(i).getItem().getId() != stockMovement.getItem().getId())
                continue;

            currentQuantity -= orders.get(i).getQuantityToComplete();

            if (currentQuantity > 0){
                OrdersMovementsStock ordersMovementsStock = new OrdersMovementsStock();
                ordersMovementsStock.setOrders(orders.get(i));
                ordersMovementsStock.setQuantity(orders.get(i).getQuantityToComplete());
                ordersMovementsStock.setStockMovement(stockMovement);

                orders.get(i).setQuantityToComplete(0.0);
                orders.get(i).setOrderCompleted(true);

                ordersRepository.save(orders.get(i));
                ordersMovementsStockRepository.save(ordersMovementsStock);
                sendMail(orders.get(i).getUser().getEmail(), orders.get(i));
                continue;
            }
            if(currentQuantity < 0){
                OrdersMovementsStock ordersMovementsStock = new OrdersMovementsStock();
                ordersMovementsStock.setOrders(orders.get(i));
                ordersMovementsStock.setQuantity(orders.get(i).getQuantityToComplete() - currentQuantity*(-1));
                ordersMovementsStock.setStockMovement(stockMovement);

                orders.get(i).setQuantityToComplete(currentQuantity*(-1));
                orders.get(i).setOrderCompleted(false);

                ordersRepository.save(orders.get(i));
                ordersMovementsStockRepository.save(ordersMovementsStock);
                break;
            }

            if (currentQuantity == 0){
                OrdersMovementsStock ordersMovementsStock = new OrdersMovementsStock();
                ordersMovementsStock.setOrders(orders.get(i));
                ordersMovementsStock.setQuantity(orders.get(i).getQuantityToComplete());
                ordersMovementsStock.setStockMovement(stockMovement);

                orders.get(i).setQuantityToComplete(0.0);
                orders.get(i).setOrderCompleted(true);

                ordersRepository.save(orders.get(i));
                ordersMovementsStockRepository.save(ordersMovementsStock);

                sendMail(orders.get(i).getUser().getEmail(), orders.get(i));
                break;
            }
        }


        if (currentQuantity > 0){
            stockMovement.setCurrentQuantity(currentQuantity);
        } else if (currentQuantity <= 0){
            stockMovement.setCurrentQuantity(0.0);
        }

        savedMovement = movementRepository.save(stockMovement);
        return stockMovement;
    }

    public List<StockMovement> listAllMovement() {
        List<StockMovement> allMovement = movementRepository.findAll();
        return allMovement;
    }


    public Optional<StockMovement> findByIdMovement(Long id) throws MovementNotFoundException {
        Optional<StockMovement> optionalStockMovement= movementRepository.findById(id);
        if (optionalStockMovement.isEmpty()){
            throw new MovementNotFoundException(id);
        }
        return optionalStockMovement;
    }


    public Long updateByIdMovement(Long id, StockMovement stockMovement) throws MovementNotFoundException{
        verifyExists(id);

        Optional<StockMovement> optionalStockMovement = movementRepository.findById(id);
        if (optionalStockMovement.isEmpty()){
            throw new MovementNotFoundException(id);
        }

        stockMovement.setCreationDate(getCurrentDate());

        StockMovement updatedMovement = movementRepository.save(stockMovement);
        return (updatedMovement.getId());

    }
    public void deleteByIdMovement(Long id) throws MovementNotFoundException{
        verifyExists(id);
        movementRepository.deleteById(id);
    }

    private void verifyExists(Long id) throws MovementNotFoundException {
        movementRepository.findById(id)
                .orElseThrow(() -> new MovementNotFoundException(id));
    }

    private String getCurrentDate(){
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date(System.currentTimeMillis());

        return formatter.format(date);
    }
    public String sendMail(String toEmail, Orders orders) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setText("Order ID: " + orders.getId() + " complete!");
        message.setTo(toEmail);
        message.setFrom("youremail@email.com.br");

        try {
            mailSender.send(message);
            return "Email enviado com sucesso!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Erro ao enviar email.";
        }
    }

}
