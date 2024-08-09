package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.entity.Item;
import com.equipo_1.SkyShop.repository.ItemRepository;
import com.equipo_1.SkyShop.service.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService implements IItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public void addItem(Item item) {
        itemRepository.save(item);
    }

    @Override
    public Optional<Item> getItem(Long id) {
        return itemRepository.findById(id);
    }

    @Override
    public List<Item> listItems() {
        return itemRepository.findAll();
    }

    @Override
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}

