package prodmaster.challenge.stockAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import prodmaster.challenge.stockAPI.exception.MovementNotFoundException;

import prodmaster.challenge.stockAPI.exception.OrdersNotFoundException;
import prodmaster.challenge.stockAPI.models.OrdersMovementsStock;
import prodmaster.challenge.stockAPI.models.StockMovement;
import prodmaster.challenge.stockAPI.service.MovementService;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/stock/movement")
@CrossOrigin
public class MovementController {
    private MovementService movementService;

    @Autowired
    public MovementController(MovementService movementService){
        this.movementService = movementService;
    }

    @PostMapping
    public StockMovement createMovement(@RequestBody StockMovement stockMovement){


        return movementService.createMovement(stockMovement);
    }

    @GetMapping
    public List<StockMovement> listAllMovement(){
        return movementService.listAllMovement();
    }

    @GetMapping("/{id}")
    public Optional<StockMovement> findByIdMovement(@PathVariable Long id) throws MovementNotFoundException {
        return movementService.findByIdMovement(id);
    }

    @PutMapping("/{id}")
    public Long updateByIdMovement(@PathVariable Long id, @RequestBody  StockMovement stockMovement) throws MovementNotFoundException {
        return movementService.updateByIdMovement(id, stockMovement);
    }

    @GetMapping("stockMovements/{id}")
    public List<OrdersMovementsStock> findOrderStockMovementsByOrderId(@PathVariable Long id) throws OrdersNotFoundException {
        return movementService.findStockMovementsByStockMovementId(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteByIdMovement(@PathVariable Long id) throws MovementNotFoundException{
        movementService.deleteByIdMovement(id);
    }
}
