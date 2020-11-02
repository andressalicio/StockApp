package prodmaster.challenge.stockAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import prodmaster.challenge.stockAPI.exception.ItemNotFoundException;
import prodmaster.challenge.stockAPI.exception.MovementNotFoundException;
import prodmaster.challenge.stockAPI.exception.OrdersNotFoundException;
import prodmaster.challenge.stockAPI.models.Item;
import prodmaster.challenge.stockAPI.models.Orders;
import prodmaster.challenge.stockAPI.models.OrdersMovementsStock;
import prodmaster.challenge.stockAPI.service.OrdersService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/stock/orders")
@CrossOrigin
public class OrdersController {
    private OrdersService ordersService;

    @Autowired
    public OrdersController(OrdersService ordersService){
        this.ordersService = ordersService;
    }

    @PostMapping
    public Orders createOrders(@RequestBody Orders orders) throws MovementNotFoundException, ItemNotFoundException {
        return ordersService.createOrders(orders);
    }

    @GetMapping
    public List<Orders> listAllOrders(){
        return ordersService.listAllOrders();
    }

    @GetMapping("/{id}")
    public Optional<Orders> findByIdOrders(@PathVariable Long id) throws OrdersNotFoundException {
        return ordersService.findByIdOrders(id);
    }

    @GetMapping("stockMovements/{id}")
    public List<OrdersMovementsStock> findOrderStockMovementsByOrderId(@PathVariable Long id) throws OrdersNotFoundException {
        return ordersService.findOrderStockMovementsByOrderId(id);
    }

    @PutMapping("/{id}")
    public Long updateByIdOrders(@PathVariable Long id, @RequestBody  Orders orders) throws OrdersNotFoundException{
        return ordersService.updateByIdOrders(id, orders);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteByIdOrders(@PathVariable Long id) throws OrdersNotFoundException{
        ordersService.deleteByIdOrders(id);
    }
}
