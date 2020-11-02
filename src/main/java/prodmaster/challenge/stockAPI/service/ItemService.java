package prodmaster.challenge.stockAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import prodmaster.challenge.stockAPI.exception.ItemNotFoundException;
import prodmaster.challenge.stockAPI.models.Item;
import prodmaster.challenge.stockAPI.repository.ItemRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    private ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository){
        this.itemRepository = itemRepository;
    }


    public Item createItem(@RequestBody Item item){
        Item savedItem = itemRepository.save(item);
        return item;
    }

    public List<Item> listAll() {
        List<Item> allItem = itemRepository.findAll();
        return allItem;
    }


    public Optional<Item> findById(Long id) throws ItemNotFoundException {
        Optional<Item> optionalItem = itemRepository.findById(id);
        if (optionalItem.isEmpty()){
            throw new ItemNotFoundException(id);
        }
        return optionalItem;
    }



    public Long updateById(Long id, Item item) throws ItemNotFoundException{
        verifyExists(id);

        Optional<Item> optionalItem = itemRepository.findById(id);
        if (optionalItem.isEmpty()){
            throw new ItemNotFoundException(id);
        }


        Item updatedItem = itemRepository.save(item);
        return (updatedItem.getId());

    }
    public void delete(Long id) throws ItemNotFoundException{
        verifyExists(id);
        itemRepository.deleteById(id);
    }
    private void verifyExists(Long id) throws ItemNotFoundException {
        itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));
    }

}
