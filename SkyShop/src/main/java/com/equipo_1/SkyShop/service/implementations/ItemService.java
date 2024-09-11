package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.entity.Item;
import com.equipo_1.SkyShop.entity.enums.Categories;
import com.equipo_1.SkyShop.repository.ItemRepository;
import com.equipo_1.SkyShop.service.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService implements IItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public Item createItem(Item item) {
        return itemRepository.save(item);
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
        if (itemRepository.existsById(id)) {
            itemRepository.deleteById(id);
        } else {
            throw new RuntimeException("Item not found");
        }
    }

    @Override
    public Item updateItem(Long id, String name, Float price, String description, Categories category, List<String> images, List<String> characteristics) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        item.setName(name);
        item.setPrice(price);
        item.setDescription(description);
        item.setCategory(category);
        item.setImages(images);
        item.setCharacteristics(characteristics);

        return itemRepository.save(item);
    }

    @Override
    public Item getItemById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }
}
