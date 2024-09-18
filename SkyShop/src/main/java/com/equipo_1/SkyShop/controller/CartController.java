package com.equipo_1.SkyShop.controller;

import com.equipo_1.SkyShop.dto.request.CartRequestDTO;
import com.equipo_1.SkyShop.dto.response.CartResponseDTO;
import com.equipo_1.SkyShop.entity.Cart;
import com.equipo_1.SkyShop.service.implementations.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // Agregar items al carrito
    @PostMapping("/{cartId}/items")
    public ResponseEntity<CartResponseDTO> addItemToCart(@PathVariable Long cartId, @RequestBody Map<Long, Integer> items) {
        Cart updatedCart = cartService.addItemToCart(cartId, items);

        // Crear CartResponseDTO con el mapa de items y cantidades
        CartResponseDTO cartResponseDTO = new CartResponseDTO(
                updatedCart.getId(),
                updatedCart.getUser().getId(),
                updatedCart.getItems(),  // Usar el mapa de items y cantidades
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