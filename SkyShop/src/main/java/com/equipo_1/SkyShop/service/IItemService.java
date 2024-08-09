package com.equipo_1.SkyShop.service;

import com.equipo_1.SkyShop.entity.Item;

import java.util.List;
import java.util.Optional;

public interface IItemService {
    void addItem(Item item);
    Optional<Item> getItem(Long id);
    List<Item> listItems();
    void deleteItem(Long id);
}
