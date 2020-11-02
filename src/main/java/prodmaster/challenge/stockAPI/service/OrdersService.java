package prodmaster.challenge.stockAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import prodmaster.challenge.stockAPI.exception.ItemNotFoundException;
import prodmaster.challenge.stockAPI.exception.MovementNotFoundException;
import prodmaster.challenge.stockAPI.exception.OrdersNotFoundException;

import prodmaster.challenge.stockAPI.models.Item;
import prodmaster.challenge.stockAPI.models.Orders;
import prodmaster.challenge.stockAPI.models.OrdersMovementsStock;
import prodmaster.challenge.stockAPI.models.StockMovement;
import prodmaster.challenge.stockAPI.repository.ItemRepository;
import prodmaster.challenge.stockAPI.repository.MovementRepository;
import prodmaster.challenge.stockAPI.repository.OrdersMovementStockRepository;
import prodmaster.challenge.stockAPI.repository.OrdersRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersService {

    private OrdersRepository ordersRepository;
    private ItemRepository itemRepository;
    private MovementRepository movementRepository;
    private OrdersMovementStockRepository ordersMovementsStockRepository;
    @Autowired
    private JavaMailSender mailSender;



    @Autowired
    public OrdersService(OrdersRepository ordersRepository, ItemRepository itemRepository, MovementRepository movementRepository, OrdersMovementStockRepository ordersMovementsStockRepository){
        this.ordersRepository = ordersRepository;
        this.itemRepository = itemRepository;
        this.movementRepository = movementRepository;
        this.ordersMovementsStockRepository = ordersMovementsStockRepository;
    }


    public Orders createOrders(@RequestBody Orders orders) throws ItemNotFoundException, MovementNotFoundException {

        Optional<Item> optionalItem = itemRepository.findById(orders.getItem().getId());
        if (optionalItem.isEmpty()){
            throw new ItemNotFoundException(orders.getItem().getId());
        }

        List<StockMovement> movements = movementRepository.findByItem(orders.getItem());
        //if (movements.isEmpty()){
        //    throw new MovementNotFoundException(orders.getItem().getId());
       // }

        orders.setCreationDate(getCurrentDate());
        Orders savedOrders= ordersRepository.save(orders);

        double orderQuantity = Double.parseDouble(orders.getQuantity());

        for (int i = 0; i < movements.size(); i++ ){
            if (movements.get(i).getCurrentQuantity() <= 0)
                continue;

            orderQuantity -= movements.get(i).getCurrentQuantity();

            // order quantity > 0
            // para a order quantity ser > 0 a quantidade da order deve ser > do que a quantidade do movimento que estamos analisando
            // Nesse caso vamos zerar o movimento de estoque e continuar pois a order não foi completa
            if (orderQuantity > 0){
                OrdersMovementsStock ordersMovementsStock = new OrdersMovementsStock();
                ordersMovementsStock.setOrders(orders);
                ordersMovementsStock.setQuantity(movements.get(i).getCurrentQuantity());
                ordersMovementsStock.setStockMovement(movements.get(i));

                movements.get(i).setCurrentQuantity(0.0);
                movementRepository.save(movements.get(i));
                ordersMovementsStockRepository.save(ordersMovementsStock);

                continue;
            }
            if(orderQuantity < 0){
                OrdersMovementsStock ordersMovementsStock = new OrdersMovementsStock();
                ordersMovementsStock.setOrders(orders);
                ordersMovementsStock.setQuantity(movements.get(i).getCurrentQuantity() - orderQuantity*(-1));
                ordersMovementsStock.setStockMovement(movements.get(i));

                movements.get(i).setCurrentQuantity(orderQuantity*(-1));
                movementRepository.save(movements.get(i));
                ordersMovementsStockRepository.save(ordersMovementsStock);

                break;
            }
            if (orderQuantity == 0){
                OrdersMovementsStock ordersMovementsStock = new OrdersMovementsStock();
                ordersMovementsStock.setOrders(orders);
                ordersMovementsStock.setQuantity(movements.get(i).getCurrentQuantity());
                ordersMovementsStock.setStockMovement(movements.get(i));

                movements.get(i).setCurrentQuantity(0.0);
                movementRepository.save(movements.get(i));
                ordersMovementsStockRepository.save(ordersMovementsStock);

                break;
            }


        }

        orders.setOrderCompleted(orderQuantity <= 0);
        if (orderQuantity > 0){
            orders.setQuantityToComplete(orderQuantity);
        }else {
            sendMail(orders.getUser().getEmail(), orders);
        }

        savedOrders= ordersRepository.save(orders);
        return orders;
    }


    public List<Orders> listAllOrders() {
        List<Orders> allOrders = ordersRepository.findAll();
        return allOrders;
    }


    public Optional<Orders> findByIdOrders(Long id) throws OrdersNotFoundException {
        Optional<Orders> optionalOrders = ordersRepository.findById(id);
        if (optionalOrders.isEmpty()){
            throw new OrdersNotFoundException(id);
        }
        return optionalOrders;
    }

    public List<OrdersMovementsStock> findOrderStockMovementsByOrderId(Long id) throws OrdersNotFoundException {
        Optional<Orders> orders = ordersRepository.findById(id);
        if (orders.isEmpty()){
            throw new OrdersNotFoundException(id);
        }
        List<OrdersMovementsStock> ordersMovements = ordersMovementsStockRepository.findByOrders(orders.get());
        return ordersMovements;
    }

    public void deleteByIdOrders(Long id) throws OrdersNotFoundException{
        verifyExists(id);
        ordersRepository.deleteById(id);
    }

    public Long updateByIdOrders(Long id, Orders orders) throws OrdersNotFoundException{
        verifyExists(id);

        Optional<Orders> optionalOrders = ordersRepository.findById(id);
        if (optionalOrders.isEmpty()){
            throw new OrdersNotFoundException(id);
        }

        orders.setCreationDate(getCurrentDate());

        Orders updatedOrders = ordersRepository.save(orders);
        return (updatedOrders.getId());

    }
    private void verifyExists(Long id) throws OrdersNotFoundException {
        ordersRepository.findById(id)
                .orElseThrow(() -> new OrdersNotFoundException(id));
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
