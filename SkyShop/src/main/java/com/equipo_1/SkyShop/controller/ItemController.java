package com.equipo_1.SkyShop.controller;

import com.equipo_1.SkyShop.dto.request.ItemRequestDTO;
import com.equipo_1.SkyShop.dto.response.ItemResponseDTO;
import com.equipo_1.SkyShop.entity.Item;
import com.equipo_1.SkyShop.entity.enums.Categories;
import com.equipo_1.SkyShop.service.implementations.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    // ListarItems
    @GetMapping
    public ResponseEntity<List<ItemResponseDTO>> getItems() {
        List<Item> items = itemService.listItems();
        List<ItemResponseDTO> itemDTOs = items.stream()
                .map(item -> new ItemResponseDTO(
                        item.getId(),
                        item.getName(),
                        item.getPrice(),
                        item.getDescription(),
                        item.getCategory().name(),
                        item.getImages(),
                        item.getCharacteristics()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(itemDTOs);
    }

    // CrearItem
    @PostMapping("/create")
    public ResponseEntity<ItemResponseDTO> createItem(@RequestBody ItemRequestDTO itemRequestDTO) {
        Item newItem = new Item(
                null,
                itemRequestDTO.getName(),
                itemRequestDTO.getPrice(),
                itemRequestDTO.getDescription(),
                Categories.valueOf(itemRequestDTO.getCategory()),
                new HashSet<>(),
                itemRequestDTO.getImages(),
                itemRequestDTO.getCharacteristics()
        );
        Item savedItem = itemService.createItem(newItem); // Este método ahora devuelve un Item
        return ResponseEntity.ok(new ItemResponseDTO(
                savedItem.getId(),
                savedItem.getName(),
                savedItem.getPrice(),
                savedItem.getDescription(),
                savedItem.getCategory().name(),
                savedItem.getImages(),
                savedItem.getCharacteristics()
        ));
    }

    // ActualizarItem
    @PutMapping("/{id}")
    public ResponseEntity<ItemResponseDTO> updateItem(@PathVariable Long id, @RequestBody ItemRequestDTO itemRequestDTO) {
        Item updatedItem = itemService.updateItem(
                id,
                itemRequestDTO.getName(),
                itemRequestDTO.getPrice(),
                itemRequestDTO.getDescription(),
                Categories.valueOf(itemRequestDTO.getCategory()),
                itemRequestDTO.getImages(),
                itemRequestDTO.getCharacteristics()
        );
        return ResponseEntity.ok(new ItemResponseDTO(
                updatedItem.getId(),
                updatedItem.getName(),
                updatedItem.getPrice(),
                updatedItem.getDescription(),
                updatedItem.getCategory().name(),
                updatedItem.getImages(),
                updatedItem.getCharacteristics()
        ));
    }

    // EliminarItem
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    // ObtenerItemPorId
    @GetMapping("/{id}")
    public ResponseEntity<ItemResponseDTO> getItemById(@PathVariable Long id) {
        Item item = itemService.getItemById(id);
        return ResponseEntity.ok(new ItemResponseDTO(
                item.getId(),
                item.getName(),
                item.getPrice(),
                item.getDescription(),
                item.getCategory().name(),
                item.getImages(),
                item.getCharacteristics()
        ));
    }
}