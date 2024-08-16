package com.equipo_1.SkyShop.controller;

import com.equipo_1.SkyShop.dto.response.ItemResponseDTO;
import com.equipo_1.SkyShop.entity.Item;
import com.equipo_1.SkyShop.service.implementations.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

public class ItemController {
    @RestController
    @RequestMapping("/api/items")
    public class ItemController {

        private final ItemService itemService;

        public ItemController(ItemService itemService) {
            this.itemService = itemService;
        }

        @GetMapping
        public ResponseEntity<List<ItemResponseDTO>> getItems() {
            List<Item> items = itemService.listItems();
            List<ItemResponseDTO> itemDTOs = items.stream()
                    .map(item -> new ItemResponseDTO(item.getId(), item.getName(),
                            item.getPrice(), item.getDescription(),
                            item.getCategory().name(), item.getImage()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(itemDTOs);
        }
    }

}
