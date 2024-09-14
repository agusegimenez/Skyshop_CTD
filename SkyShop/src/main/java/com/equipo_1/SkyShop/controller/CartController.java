package com.equipo_1.SkyShop.controller;

import com.equipo_1.SkyShop.dto.request.CartRequestDTO;
import com.equipo_1.SkyShop.dto.request.CartItemRequestDTO;
import com.equipo_1.SkyShop.dto.response.CartResponseDTO;
import com.equipo_1.SkyShop.dto.response.CartItemResponseDTO;
import com.equipo_1.SkyShop.entity.Cart;
import com.equipo_1.SkyShop.entity.CartItem;
import com.equipo_1.SkyShop.service.implementations.CartService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // ListarCarts
    @GetMapping
    public ResponseEntity<List<CartResponseDTO>> getCarts() {
        List<CartResponseDTO> cartDTOs = cartService.list();
        return ResponseEntity.ok(cartDTOs);
    }

    // CrearCart
    @PostMapping
    public ResponseEntity<CartResponseDTO> createCart(@RequestBody CartRequestDTO cartRequestDTO) {
        CartResponseDTO createdCart = cartService.save(cartRequestDTO);
        return ResponseEntity.ok(createdCart);
    }

    // ObtenerCartPorId
    @GetMapping("/{id}")
    public ResponseEntity<CartResponseDTO> getCartById(@PathVariable Long id) {
        CartResponseDTO cartResponseDTO = cartService.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se ha podido encontrar el carrito con ID " + id + "."));
        return ResponseEntity.ok(cartResponseDTO);
    }

    // ActualizarCart
    @PutMapping
    public ResponseEntity<Void> updateCart(@RequestBody CartRequestDTO cartRequestDTO) {
        cartService.update(cartRequestDTO);
        return ResponseEntity.noContent().build();
    }

    // EliminarCart
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long id) {
        cartService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // AgregarItemAlCarrito
    @PostMapping("/{cartId}/items")
    public ResponseEntity<CartResponseDTO> addItemToCart(@PathVariable Long cartId, @RequestBody CartItemRequestDTO cartItemRequestDTO) {
        Cart updatedCart = cartService.addItemToCart(cartId, cartItemRequestDTO);

        // Convertir la lista de CartItem a una lista de CartItemResponseDTO
        Set<CartItemResponseDTO> cartItemResponseDTOs = updatedCart.getCartItems().stream()
                .map(cartItem -> new CartItemResponseDTO(
                        cartItem.getId(),
                        cartItem.getItem().getId(),
                        cartItem.getQuantity()
                ))
                .collect(Collectors.toSet());

        // Crear CartResponseDTO con la lista de CartItemResponseDTO
        CartResponseDTO cartResponseDTO = new CartResponseDTO(
                updatedCart.getId(),
                updatedCart.getUser().getId(),
                cartItemResponseDTOs,  // Usar el conjunto de CartItemResponseDTO
                updatedCart.getCreatedAt().toString()
        );

        return ResponseEntity.ok(cartResponseDTO);
    }

    // EliminarItemDelCarrito
    @DeleteMapping("/{cartId}/items/{itemId}")
    public ResponseEntity<Void> removeItemFromCart(@PathVariable Long cartId, @PathVariable Long itemId) {
        cartService.removeItemFromCart(cartId, itemId);
        return ResponseEntity.noContent().build();
    }
}