package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.dto.request.BlockDateRequestDTO;
import com.equipo_1.SkyShop.dto.request.OrderItemRequestDTO;
import com.equipo_1.SkyShop.dto.request.OrderRequestDTO;
import com.equipo_1.SkyShop.dto.response.OrderResponseDTO;
import com.equipo_1.SkyShop.entity.Cart;
import com.equipo_1.SkyShop.entity.Order;
import com.equipo_1.SkyShop.entity.OrderItem;
import com.equipo_1.SkyShop.entity.User;
import com.equipo_1.SkyShop.entity.enums.OrderStatus;
import com.equipo_1.SkyShop.repository.CartRepository;
import com.equipo_1.SkyShop.repository.OrderItemRepository;
import com.equipo_1.SkyShop.repository.OrderRepository;
import com.equipo_1.SkyShop.repository.UserRepository;
import com.equipo_1.SkyShop.service.implementations.CalendarService;
import com.equipo_1.SkyShop.service.implementations.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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
    private CartService cartService; // Asumiendo que ya tienes un servicio para manejar el carrito

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartRepository cartRepository;

    public OrderResponseDTO createOrder(Long cartId) {
        // Buscar el carrito
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        // Crear una nueva orden
        Order order = new Order();
        order.setUser(cart.getUser());
        order.setOrderedAt(LocalDateTime.now());

        // Guardar la orden en la base de datos
        Order savedOrder = orderRepository.save(order);

        // Crear un nuevo OrderItem basado en el contenido del carrito
        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(savedOrder);
        orderItem.setItem(cart.getItem());
        orderItem.setQuantity(cart.getQuantity());
        orderItem.setPrice(cart.getItem().getPrice() * cart.getQuantity());

        // Guardar el OrderItem en la base de datos
        orderItemRepository.save(orderItem);

        // Limpiar el carrito después de generar la orden
        cart.setItem(null);
        cart.setQuantity(0);
        cartRepository.save(cart);

        return mapToOrderResponseDTO(savedOrder);
    }

    public OrderResponseDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return mapToOrderResponseDTO(order);
    }

    public OrderResponseDTO mapToOrderResponseDTO(Order savedOrder) {
        OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
        orderResponseDTO.setId(savedOrder.getId());
        orderResponseDTO.setClientId(savedOrder.getUser().getId());
        orderResponseDTO.setItems(orderItemService.getOrderItemsByOrderId(savedOrder.getId()));
        orderResponseDTO.setOrderedAt(savedOrder.getOrderedAt().toString());
        orderResponseDTO.setStatus(savedOrder.getStatus().name());

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
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Actualizar detalles de la orden
        order.setStartTime(orderRequestDTO.getStartTime());
        order.setEndTime(orderRequestDTO.getEndTime());
        order.setStatus(OrderStatus.PENDING); // Actualizar estado si es necesario

        // Guardar la orden actualizada
        Order updatedOrder = orderRepository.save(order);

        // Actualizar los OrderItems si es necesario
        // Puedes añadir lógica para actualizar los ítems aquí

        return mapToOrderResponseDTO(updatedOrder);
    }

    public List<OrderResponseDTO> getOrdersByStatus(OrderStatus status) {
        List<Order> orders = orderRepository.findByStatus(status);
        return orders.stream()
                .map(this::mapToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    public List<OrderResponseDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::mapToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

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