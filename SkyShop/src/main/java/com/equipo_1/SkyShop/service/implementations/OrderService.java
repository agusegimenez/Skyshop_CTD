package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.dto.request.BlockDateRequestDTO;
import com.equipo_1.SkyShop.dto.request.OrderItemRequestDTO;
import com.equipo_1.SkyShop.dto.request.OrderRequestDTO;
import com.equipo_1.SkyShop.dto.response.OrderResponseDTO;
import com.equipo_1.SkyShop.dto.response.OrderItemResponseDTO;
import com.equipo_1.SkyShop.entity.Order;
import com.equipo_1.SkyShop.entity.User;
import com.equipo_1.SkyShop.entity.enums.OrderStatus;
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

    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO) {
        User user = userRepository.findById(orderRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDateTime orderStartTime = LocalDateTime.now();
        LocalDateTime orderEndTime = orderStartTime.plusHours(1);

        // Validar que la fecha no esté bloqueada
        boolean isBlocked = calendarService.isDateBlocked(orderStartTime, orderEndTime);
        if (isBlocked) {
            throw new IllegalStateException("The selected date and time are not available.");
        }

        // Crear la orden
        Order order = new Order();
        order.setUser(user);
        order.setTotal(orderRequestDTO.getTotal());
        order.setOrderedAt(orderStartTime);
        order.setStatus(OrderStatus.PENDING);

        Order savedOrder = orderRepository.save(order);

        // Crear OrderItems
        for (OrderItemRequestDTO orderItemRequestDTO : orderRequestDTO.getItems()) {
            orderItemService.createOrderItem(orderItemRequestDTO, savedOrder.getId());
        }

        // Bloquear el rango de fechas en el calendario
        BlockDateRequestDTO blockDateRequestDTO = new BlockDateRequestDTO(
                orderStartTime.minusHours(1),
                orderEndTime.plusHours(1)
        );
        calendarService.blockDate(blockDateRequestDTO);

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
        orderResponseDTO.setItems(orderItemService.getOrderItemsByOrderId(savedOrder.getId())); // Asegúrate de usar el servicio correcto para obtener OrderItems
        orderResponseDTO.setTotal(savedOrder.getTotal());
        orderResponseDTO.setOrderedAt(savedOrder.getOrderedAt().toString());
        orderResponseDTO.setStatus(savedOrder.getStatus().name());

        return orderResponseDTO;
    }

    public List<OrderResponseDTO> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(order -> mapToOrderResponseDTO(order))
                .collect(Collectors.toList());
    }

    public OrderResponseDTO updateOrder(Long orderId, OrderRequestDTO orderRequestDTO) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Verifica y actualiza el total, estado, etc., según sea necesario
        order.setTotal(orderRequestDTO.getTotal());
        order.setStatus(OrderStatus.valueOf(orderRequestDTO.getStatus()));

        // Guardar la orden actualizada
        Order updatedOrder = orderRepository.save(order);

        // Actualizar los OrderItems si es necesario (esto podría ser más complejo)
        // Aquí podrías usar OrderItemService si necesitas manejar los items relacionados

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

        // Desbloquear el rango de fechas en el calendario (si es necesario)
        BlockDateRequestDTO blockDateRequestDTO = new BlockDateRequestDTO(
                order.getOrderedAt().minusHours(1),
                order.getOrderedAt().plusHours(1)
        );
        calendarService.unblockDate(order.getId());

        orderRepository.deleteById(orderId); // Asegúrate de que este método exista
    }


}