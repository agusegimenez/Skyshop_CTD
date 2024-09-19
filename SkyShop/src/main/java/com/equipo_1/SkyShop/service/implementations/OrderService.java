package com.equipo_1.SkyShop.service.implementations;
import com.equipo_1.SkyShop.dto.request.BlockDateRequestDTO;
import com.equipo_1.SkyShop.dto.request.OrderRequestDTO;
import com.equipo_1.SkyShop.dto.response.OrderItemResponseDTO;
import com.equipo_1.SkyShop.dto.response.OrderResponseDTO;
import com.equipo_1.SkyShop.entity.*;
import com.equipo_1.SkyShop.entity.enums.OrderStatus;
import com.equipo_1.SkyShop.repository.CartRepository;
import com.equipo_1.SkyShop.repository.OrderItemRepository;
import com.equipo_1.SkyShop.repository.OrderRepository;
import com.equipo_1.SkyShop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CalendarService calendarService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private CartService cartService; // Servicio del carrito

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartRepository cartRepository;

    public OrderResponseDTO createOrder(Long cartId) {
        // Encontrar el carrito por su ID
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));

        // Obtener el usuario del carrito
        User user = cart.getUser();

        // Crear una nueva orden y asignar el usuario
        Order order = new Order();
        order.setUser(user);
        order.setOrderedAt(LocalDateTime.now());

        // Obtener el ítem del carrito
        Item item = cart.getItem();
        if (item == null) {
            throw new RuntimeException("El carrito está vacío");
        }

        // Crear el OrderItem
        OrderItem orderItem = new OrderItem();
        orderItem.setItem(item);
        orderItem.setOrder(order);
        orderItem.setQuantity(cart.getQuantity());
        orderItem.setPrice(item.getPrice());  // Añadir el precio del ítem
        order.getItems().add(orderItem);

        // Guardar la orden
        Order savedOrder = orderRepository.save(order);

        // Limpiar o eliminar el carrito
        cart.setItem(null);
        cart.setQuantity(0);
        cartRepository.save(cart);

        // Retornar la respuesta de la orden creada
        return new OrderResponseDTO(
                savedOrder.getId(),
                user.getId(),
                savedOrder.getItems().stream().map(orderItemSaved -> new OrderItemResponseDTO(
                        orderItemSaved.getItem().getId(),
                        orderItemSaved.getItem().getName(),
                        orderItemSaved.getQuantity(),
                        orderItemSaved.getPrice()
                )).collect(Collectors.toList()),
                savedOrder.getOrderedAt(),
                savedOrder.getStatus().name()
        );
    }

    public OrderResponseDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
        return mapToOrderResponseDTO(order);
    }

    public OrderResponseDTO mapToOrderResponseDTO(Order order) {
        OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
        orderResponseDTO.setId(order.getId());
        orderResponseDTO.setClientId(order.getUser().getId());

        orderResponseDTO.setItems(order.getItems().stream()
                .map(orderItem -> new OrderItemResponseDTO(
                        orderItem.getItem().getId(),
                        orderItem.getItem().getName(),
                        orderItem.getQuantity(),
                        orderItem.getPrice()
                ))
                .collect(Collectors.toList()));
        orderResponseDTO.setOrderedAt(order.getOrderedAt());
        orderResponseDTO.setStatus(order.getStatus().name());

        return orderResponseDTO;
    }

    public List<OrderResponseDTO> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(this::mapToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    public OrderResponseDTO updateOrder(Long orderId, OrderRequestDTO orderRequestDTO) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        // Actualizar detalles de la orden
        order.setStartTime(orderRequestDTO.getStartTime());
        order.setEndTime(orderRequestDTO.getEndTime());
        order.setStatus(OrderStatus.PENDING); // Actualizar estado si es necesario

        // Guardar la orden actualizada
        Order updatedOrder = orderRepository.save(order);

        return mapToOrderResponseDTO(updatedOrder);
    }

    public List<OrderResponseDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::mapToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        // Solo desbloquear si la orden fue confirmada
        if (order.getStatus() == OrderStatus.CONFIRMED) {
            BlockDateRequestDTO blockDateRequestDTO = new BlockDateRequestDTO(
                    order.getStartTime().minusHours(1),
                    order.getEndTime().plusHours(1)
            );
            calendarService.unblockDate(blockDateRequestDTO);
        }

        orderRepository.deleteById(orderId);
    }
}