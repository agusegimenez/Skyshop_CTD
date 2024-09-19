package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.dto.request.OrderItemRequestDTO;
import com.equipo_1.SkyShop.dto.response.OrderItemResponseDTO;
import com.equipo_1.SkyShop.entity.Order;
import com.equipo_1.SkyShop.entity.OrderItem;
import com.equipo_1.SkyShop.entity.Item;
import com.equipo_1.SkyShop.repository.OrderItemRepository;
import com.equipo_1.SkyShop.repository.OrderRepository;
import com.equipo_1.SkyShop.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ItemRepository itemRepository;

    public OrderItemResponseDTO createOrderItem(OrderItemRequestDTO orderItemRequestDTO, Long orderId) {
        if (orderItemRequestDTO.getQuantity() <= 0) {
            throw new IllegalArgumentException("La cantidad debe ser mayor a 0");
        }

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        if (!order.getItems().isEmpty()) {
            throw new IllegalArgumentException("La orden ya tiene un ítem asociado.");
        }

        // Crear el nuevo OrderItem y asignarlo a la orden
        OrderItem orderItem = new OrderItem();
        Item item = itemRepository.findById(orderItemRequestDTO.getItemId())
                .orElseThrow(() -> new RuntimeException("Item no encontrado"));

        orderItem.setOrder(order);
        orderItem.setItem(item);
        orderItem.setQuantity(orderItemRequestDTO.getQuantity());
        orderItem.setPrice(item.getPrice());  // Establecer el precio en el OrderItem

        // Guardar el OrderItem
        OrderItem savedOrderItem = orderItemRepository.save(orderItem);

        return mapToOrderItemResponseDTO(savedOrderItem);
    }

    public List<OrderItemResponseDTO> getOrderItemsByOrderId(Long orderId) {
        List<OrderItem> orderItems = orderItemRepository.findAllByOrderId(orderId);
        return orderItems.stream()
                .map(this::mapToOrderItemResponseDTO)
                .collect(Collectors.toList());
    }

    public OrderItemResponseDTO mapToOrderItemResponseDTO(OrderItem orderItem) {
        OrderItemResponseDTO orderItemResponseDTO = new OrderItemResponseDTO();
        orderItemResponseDTO.setItemId(orderItem.getItem().getId());
        orderItemResponseDTO.setItemName(orderItem.getItem().getName());
        orderItemResponseDTO.setQuantity(orderItem.getQuantity());
        orderItemResponseDTO.setPrice(orderItem.getPrice());

        return orderItemResponseDTO;
    }
}