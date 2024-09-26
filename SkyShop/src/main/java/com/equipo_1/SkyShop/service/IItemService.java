package com.equipo_1.SkyShop.service;

import com.equipo_1.SkyShop.entity.Item;
import com.equipo_1.SkyShop.entity.enums.Categories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface IItemService {
    Item createItem(Item item);
    Optional<Item> getItem(Long id);
    List<Item> listItems();
    void deleteItem(Long id);
    Item updateItem(Long id, String name, Float price, String description, Categories category, List<String> images, List<String> characteristics);
    Item getItemById(Long id);
}