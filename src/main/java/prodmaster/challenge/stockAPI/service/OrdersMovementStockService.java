package prodmaster.challenge.stockAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import prodmaster.challenge.stockAPI.exception.ItemNotFoundException;
import prodmaster.challenge.stockAPI.exception.MovementNotFoundException;

import prodmaster.challenge.stockAPI.models.Orders;
import prodmaster.challenge.stockAPI.models.OrdersMovementsStock;
import prodmaster.challenge.stockAPI.models.User;
import prodmaster.challenge.stockAPI.repository.ItemRepository;
import prodmaster.challenge.stockAPI.repository.MovementRepository;
import prodmaster.challenge.stockAPI.repository.OrdersMovementStockRepository;
import prodmaster.challenge.stockAPI.repository.OrdersRepository;


import java.util.List;
import java.util.Optional;

public class OrdersMovementStockService {

    private OrdersMovementStockRepository ordersMovementStockRepository;

    @Autowired
    public OrdersMovementStockService(OrdersMovementStockRepository ordersMovementStockRepository){
       this.ordersMovementStockRepository = ordersMovementStockRepository;
    }

    public OrdersMovementsStock createOrdersMovementStock(@RequestBody OrdersMovementsStock ordersMovementsStock){
        OrdersMovementsStock savedUser = ordersMovementStockRepository.save(ordersMovementsStock);
        return ordersMovementsStock;
    }

}
