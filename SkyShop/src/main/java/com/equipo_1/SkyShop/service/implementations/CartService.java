package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.entity.Cart;
import com.equipo_1.SkyShop.entity.Item;
import com.equipo_1.SkyShop.entity.User;
import com.equipo_1.SkyShop.repository.CartRepository;
import com.equipo_1.SkyShop.repository.ItemRepository;
import com.equipo_1.SkyShop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    public Cart createCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setCreatedAt(LocalDateTime.now());

        return cartRepository.save(cart);
    }

    public Cart addItemToCart(Long cartId, Map<Long, Integer> items) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (!items.isEmpty()) {
            Long itemId = items.keySet().iterator().next();  // Obtener el primer y único ítem
            Item item = itemRepository.findById(itemId)
                    .orElseThrow(() -> new RuntimeException("Item not found"));

            cart.setItem(item);
            cart.setQuantity(items.get(itemId));
        }

        return cartRepository.save(cart);
    }

    public Cart removeItemFromCart(Long cartId, Long itemId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getItem() == null || !cart.getItem().getId().equals(itemId)) {
            throw new RuntimeException("Item not found in the cart");
        }

        cart.setItem(null);
        cart.setQuantity(0);
        return cartRepository.save(cart);
    }

    public Cart clearCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.setItem(null);
        cart.setQuantity(0);
        return cartRepository.save(cart);
    }
}


