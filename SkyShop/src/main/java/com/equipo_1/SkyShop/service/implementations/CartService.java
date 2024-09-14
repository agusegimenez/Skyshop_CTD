package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.dto.request.CartItemRequestDTO;
import com.equipo_1.SkyShop.dto.request.CartRequestDTO;
import com.equipo_1.SkyShop.dto.response.CartItemResponseDTO;
import com.equipo_1.SkyShop.dto.response.CartResponseDTO;
import com.equipo_1.SkyShop.entity.Cart;
import com.equipo_1.SkyShop.entity.CartItem;
import com.equipo_1.SkyShop.entity.Item;
import com.equipo_1.SkyShop.entity.User;
import com.equipo_1.SkyShop.entity.enums.UserRole;
import com.equipo_1.SkyShop.repository.CartItemRepository;
import com.equipo_1.SkyShop.repository.CartRepository;
import com.equipo_1.SkyShop.repository.ItemRepository;
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
    private final ItemRepository itemRepository;
    private final CartItemRepository cartItemRepository;

    public CartService(CartRepository cartRepository, UserRepository userRepository, ItemRepository itemRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public CartResponseDTO save(CartRequestDTO cartRequestDTO) {
        LOGGER.info("Adding cart...");
        Cart cart = new Cart();

        // Validar el usuario
        User user = userRepository.findById(cartRequestDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Error al intentar crear nuevo carrito. No se ha podido encontrar el cliente con ID " + cartRequestDTO.getUserId() + "."));

        if (user.getRole() != UserRole.CLIENT) {
            LOGGER.info("Cart could not be added. User is not a valid client.");
            throw new IllegalArgumentException("Error al intentar crear nuevo carrito. El usuario no es un cliente válido.");
        }

        cart.setUser(user);
        cart.setCreatedAt(LocalDateTime.now());
        cart.setCartItems(new HashSet<>()); // Inicializar el HashSet

        // Guardar el carrito antes de agregar items
        cart = cartRepository.save(cart);

        // Agregar ítems al carrito si existen en el DTO
        Set<CartItemRequestDTO> cartItemRequestDTOs = cartRequestDTO.getCartItems();
        if (cartItemRequestDTOs != null) {
            for (CartItemRequestDTO cartItemRequestDTO : cartItemRequestDTOs) {
                Item item = itemRepository.findById(cartItemRequestDTO.getItemId())
                        .orElseThrow(() -> new EntityNotFoundException("Item not found"));

                // Verificar si el carrito ya tiene algún ítem
                boolean itemExists = cart.getCartItems().stream()
                        .anyMatch(cartItem -> cartItem.getItem().equals(item));

                if (itemExists) {
                    throw new IllegalArgumentException("El ítem ya está en el carrito. No se puede agregar otro ítem.");
                }

                CartItem cartItem = new CartItem();
                cartItem.setItem(item);
                cartItem.setQuantity(cartItemRequestDTO.getQuantity());
                cartItem.setCart(cart); // Asignar el carrito al ítem

                // Guardar el CartItem
                cartItemRepository.save(cartItem);

                // Añadir el CartItem al carrito
                cart.getCartItems().add(cartItem);
            }
            cartRepository.save(cart); // Actualizar el carrito en la base de datos
        }

        LOGGER.info("Cart successfully added.");

        // Convertir el conjunto de CartItems a CartItemResponseDTO
        Set<CartItemResponseDTO> cartItemResponseDTOs = cart.getCartItems().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toSet());

        return new CartResponseDTO(cart.getId(), cart.getUser().getId(), cartItemResponseDTOs, cart.getCreatedAt().toString());
    }

    @Override
    public Optional<CartResponseDTO> findById(Long id) {
        LOGGER.info("Searching cart...");
        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se ha podido encontrar el carrito con ID " + id + "."));

        Set<CartItemResponseDTO> cartItemResponseDTOs = cart.getCartItems().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toSet());

        LOGGER.info("Cart found.");
        return Optional.of(new CartResponseDTO(cart.getId(), cart.getUser().getId(), cartItemResponseDTOs, cart.getCreatedAt().toString()));
    }

    @Override
    public List<CartResponseDTO> list() {
        LOGGER.info("Listing all carts...");
        List<Cart> carts = cartRepository.findAll();

        return carts.stream()
                .map(cart -> {
                    Set<CartItemResponseDTO> cartItemResponseDTOs = cart.getCartItems().stream()
                            .map(this::convertToDTO)
                            .collect(Collectors.toSet());

                    return new CartResponseDTO(cart.getId(), cart.getUser().getId(), cartItemResponseDTOs, cart.getCreatedAt().toString());
                })
                .collect(Collectors.toList());
    }

    @Override
    public void update(CartRequestDTO cartRequestDTO) {
        LOGGER.info("Updating cart...");
        Cart cart = cartRepository.findById(cartRequestDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("No se ha podido encontrar el carrito con ID " + cartRequestDTO.getId() + "."));

        User user = userRepository.findById(cartRequestDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("No se ha podido encontrar el usuario con ID " + cartRequestDTO.getUserId() + "."));

        if (user.getRole() != UserRole.CLIENT) {
            LOGGER.info("Cart could not be updated. User is not a valid client.");
            throw new IllegalArgumentException("Error al intentar actualizar el carrito. El usuario no es un cliente válido.");
        }

        cart.setUser(user);
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);
        LOGGER.info("Cart successfully updated.");
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

    public Cart addItemToCart(Long cartId, CartItemRequestDTO cartItemRequestDTO) {
        LOGGER.info("Adding item to cart...");

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new EntityNotFoundException("No se ha podido encontrar el carrito con ID " + cartId + "."));

        Item item = itemRepository.findById(cartItemRequestDTO.getItemId())
                .orElseThrow(() -> new EntityNotFoundException("No se ha podido encontrar el item con ID " + cartItemRequestDTO.getItemId() + "."));

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setItem(item);
        cartItem.setQuantity(cartItemRequestDTO.getQuantity());

        // Guardar el CartItem
        cartItemRepository.save(cartItem);

        // Añadir el CartItem al carrito
        cart.getCartItems().add(cartItem);
        cartRepository.save(cart); // Actualizar el carrito en la base de datos

        LOGGER.info("Item successfully added to cart.");
        return cart;
    }

    public void removeItemFromCart(Long cartId, Long itemId) {
        LOGGER.info("Removing item from cart...");

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new EntityNotFoundException("No se ha podido encontrar el carrito con ID " + cartId + "."));

        CartItem cartItem = cart.getCartItems().stream()
                .filter(ci -> ci.getItem().getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("No se ha podido encontrar el item con ID " + itemId + " en el carrito con ID " + cartId + "."));

        // Eliminar el CartItem del carrito
        cart.getCartItems().remove(cartItem);
        cartItemRepository.delete(cartItem);

        // Actualizar el carrito en la base de datos
        cartRepository.save(cart);
        LOGGER.info("Item successfully removed from cart.");
    }

    private CartItemResponseDTO convertToDTO(CartItem cartItem) {
        return new CartItemResponseDTO(
                cartItem.getId(),
                cartItem.getItem().getId(),
                cartItem.getQuantity()
        );
    }
}
