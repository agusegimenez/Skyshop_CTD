package com.equipo_1.SkyShop.controller;

import com.equipo_1.SkyShop.dto.request.CartRequestDTO;
import com.equipo_1.SkyShop.dto.response.CartResponseDTO;
import com.equipo_1.SkyShop.entity.Cart;
import com.equipo_1.SkyShop.service.implementations.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // Crear carrito
    @PostMapping
    public ResponseEntity<CartResponseDTO> createCart(@RequestBody CartRequestDTO cartRequestDTO) {
        Cart newCart = cartService.createCart(cartRequestDTO.getUserId());
        return ResponseEntity.ok(new CartResponseDTO(
                newCart.getId(),
                newCart.getUser().getId(),
                newCart.getItem() != null ? newCart.getItem().getId() : null, // ID del ítem si existe
                newCart.getQuantity(),  // Cantidad del ítem si existe
                newCart.getCreatedAt()
        ));
    }

    // Agregar items al carrito
    @PostMapping("/{cartId}/items")
    public ResponseEntity<CartResponseDTO> addItemToCart(@PathVariable Long cartId, @RequestBody Map<Long, Integer> item) {
        // Validar que solo se agregue un ítem
        if (item.size() != 1) {
            throw new RuntimeException("You can only add one item to the cart.");
        }

        Cart updatedCart = cartService.addItemToCart(cartId, item);

        // Crear CartResponseDTO con el ítem y cantidad
        CartResponseDTO cartResponseDTO = new CartResponseDTO(
                updatedCart.getId(),
                updatedCart.getUser().getId(),
                updatedCart.getItem() != null ? updatedCart.getItem().getId() : null, // ID del ítem
                updatedCart.getQuantity(),  // Cantidad del ítem
                updatedCart.getCreatedAt()
        );

        return ResponseEntity.ok(cartResponseDTO);
    }

    // Eliminar item del carrito
    @DeleteMapping("/{cartId}/items/{itemId}")
    public ResponseEntity<Void> removeItemFromCart(@PathVariable Long cartId, @PathVariable Long itemId) {
        cartService.removeItemFromCart(cartId, itemId);
        return ResponseEntity.noContent().build();
    }

    // Limpiar carrito
    @DeleteMapping("/{cartId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Long cartId) {
        cartService.clearCart(cartId);
        return ResponseEntity.noContent().build();
    }
}

