package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.dto.request.CartRequestDTO;
import com.equipo_1.SkyShop.dto.response.CartItemResponseDTO;
import com.equipo_1.SkyShop.dto.response.CartResponseDTO;
import com.equipo_1.SkyShop.entity.Cart;
import com.equipo_1.SkyShop.entity.CartItem;
import com.equipo_1.SkyShop.entity.User;
import com.equipo_1.SkyShop.entity.enums.UserRole;
import com.equipo_1.SkyShop.repository.CartItemRepository;
import com.equipo_1.SkyShop.repository.CartRepository;
import com.equipo_1.SkyShop.repository.UserRepository;
import com.equipo_1.SkyShop.service.ICartService;
import jakarta.persistence.EntityNotFoundException;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CartService implements ICartService {

    private static final Logger LOGGER = Logger.getLogger(CartService.class);
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;

    public CartService(CartRepository cartRepository, UserRepository userRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public CartResponseDTO save(CartRequestDTO cartRequestDTO) {
        LOGGER.info("Adding cart...");
        Cart cart = new Cart();

        Optional<User> user = userRepository.findById(cartRequestDTO.getUserId());
        if (user.isPresent()) {
            User client = user.get();
            if (client.getRole() == UserRole.CLIENT) {
                cart.setUser(client);
            } else {
                LOGGER.info("Cart could not be added. User is not a valid client.");
                throw new IllegalArgumentException("Error al intentar crear nuevo carrito. El usuario no es un cliente válido.");
            }
        } else {
            LOGGER.info("Cart could not be added. Client not found.");
            throw new EntityNotFoundException("Error al intentar crear nuevo carrito. No se ha podido encontrar el cliente con ID " + cartRequestDTO.getUserId() + ".");
        }

        cart.setCreatedAt(LocalDateTime.now());
        cartRepository.save(cart);

        LOGGER.info("Cart successfully added.");
        return new CartResponseDTO(cart.getId(), cart.getUser().getId(), new HashSet<>(), cart.getCreatedAt().toString());
    }

    public CartItemResponseDTO convertToDTO(CartItem cartItem) {
        CartItemResponseDTO cartItemResponseDTO = new CartItemResponseDTO();
        cartItemResponseDTO.setId(cartItem.getId());
        cartItemResponseDTO.setCartId(cartItem.getCart().getId());
        cartItemResponseDTO.setItemId(cartItem.getItem().getId());
        cartItemResponseDTO.setQuantity(cartItem.getQuantity());
        return cartItemResponseDTO;
    }

    @Override
    public Optional<CartResponseDTO> findById(Long id) {
        LOGGER.info("Searching cart...");
        Optional<Cart> searchedCart = cartRepository.findById(id);
        if (searchedCart.isPresent()) {
            Cart cart = searchedCart.get();
            Set<CartItemResponseDTO> cartItemResponseDTOSet = cart.getCartItems().stream().map(this::convertToDTO).collect(Collectors.toSet());
            LOGGER.info("Cart found.");
            return Optional.of(new CartResponseDTO(cart.getId(), cart.getUser().getId(), cartItemResponseDTOSet, cart.getCreatedAt().toString()));
        } else {
            LOGGER.info("Cart could not be found.");
            throw new EntityNotFoundException("No se ha podido encontrar el carrito con ID " + id + ".");
        }
    }

    @Override
    public List<CartResponseDTO> list() {
        LOGGER.info("Listing all carts...");
        List<Cart> carts = cartRepository.findAll();
        return carts.stream()
                .map(cart -> {
                    Set<CartItemResponseDTO> cartItems = cart.getCartItems().stream()
                            .map(this::convertToDTO)
                            .collect(Collectors.toSet());
                    return new CartResponseDTO(cart.getId(), cart.getUser().getId(), cartItems, cart.getCreatedAt().toString());
                })
                .collect(Collectors.toList());
    }

    @Override
    public void update(CartRequestDTO cartRequestDTO) {
        LOGGER.info("Updating cart...");
        Optional<Cart> existingCart = cartRepository.findById(cartRequestDTO.getId());
        if (existingCart.isPresent()) {
            Cart cart = existingCart.get();

            Optional<User> user = userRepository.findById(cartRequestDTO.getUserId());
            if (user.isPresent() && user.get().getRole() == UserRole.CLIENT) {
                cart.setUser(user.get());
            } else {
                LOGGER.info("Cart could not be updated. User is not a valid client.");
                throw new IllegalArgumentException("Error al intentar actualizar el carrito. El usuario no es un cliente válido.");
            }

            cart.setUpdatedAt(LocalDateTime.now());
            cartRepository.save(cart);
            LOGGER.info("Cart successfully updated.");
        } else {
            LOGGER.info("Cart could not be updated. Cart not found.");
            throw new EntityNotFoundException("No se ha podido encontrar el carrito con ID " + cartRequestDTO.getId() + ".");
        }
    }

    @Override
    public void delete(Long id) {
        LOGGER.info("Deleting cart...");
        if (cartRepository.existsById(id)) {
            cartRepository.deleteById(id);
            LOGGER.info("Cart successfully deleted.");
        } else {
            LOGGER.info("Cart could not be deleted. Cart not found.");
            throw new EntityNotFoundException("No se ha podido encontrar el carrito con ID " + id + ".");
        }
    }
}