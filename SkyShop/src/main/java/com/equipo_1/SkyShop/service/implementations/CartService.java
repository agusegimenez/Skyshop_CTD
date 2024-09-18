package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.entity.Cart;
import com.equipo_1.SkyShop.entity.Item;
import com.equipo_1.SkyShop.repository.CartRepository;
import com.equipo_1.SkyShop.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ItemRepository itemRepository;

    public Cart addItemToCart(Long cartId, Map<Long, Integer> items) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        for (Map.Entry<Long, Integer> entry : items.entrySet()) {
            Long itemId = entry.getKey();
            Integer quantity = entry.getValue();

            Item item = itemRepository.findById(itemId)
                    .orElseThrow(() -> new RuntimeException("Item not found"));

            cart.getItems().put(item.getId(), quantity); // Agregar o actualizar el item
        }

        return cartRepository.save(cart);
    }

    public Cart removeItemFromCart(Long cartId, Long itemId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        cart.getItems().remove(item);
        return cartRepository.save(cart);
    }

    public Cart clearCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().clear();
        return cartRepository.save(cart);
    }
}
