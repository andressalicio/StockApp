package prodmaster.challenge.stockAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import prodmaster.challenge.stockAPI.exception.ItemNotFoundException;
import prodmaster.challenge.stockAPI.models.Item;
import prodmaster.challenge.stockAPI.service.ItemService;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("api/v1/stock/item")
@CrossOrigin
public class ItemController {
    private ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService){
        this.itemService = itemService;
    }

    @PostMapping
    public Item createItem(@RequestBody Item item){
        return itemService.createItem(item);

    }

    @GetMapping
    public List<Item> listAll(){
        return itemService.listAll();
    }

    @GetMapping("/{id}")
    public Optional<Item> findById(@PathVariable Long id) throws ItemNotFoundException {
        return itemService.findById(id);
    }

    @PutMapping("/{id}")
    public Long updateById(@PathVariable Long id, @RequestBody  Item item) throws ItemNotFoundException{
        return itemService.updateById(id, item);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) throws ItemNotFoundException{
        itemService.delete(id);
    }
}
