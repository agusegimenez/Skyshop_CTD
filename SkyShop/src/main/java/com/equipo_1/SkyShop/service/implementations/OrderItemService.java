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

    public OrderItem createOrderItem(OrderItemRequestDTO orderItemRequestDTO, Long orderId) {
        // Buscar la orden por ID
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Buscar el ítem por ID
        Item item = itemRepository.findById(orderItemRequestDTO.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        // Crear un nuevo OrderItem
        OrderItem orderItem = new OrderItem();
        orderItem.setItem(item);
        orderItem.setQuantity(orderItemRequestDTO.getQuantity());
        orderItem.setPrice(item.getPrice()); // Aquí se asigna el precio desde el item
        orderItem.setOrder(order);

        return orderItemRepository.save(orderItem);
    }

    public List<OrderItemResponseDTO> getOrderItemsByOrderId(Long orderId) {
        List<OrderItem> orderItems = orderItemRepository.findAllByOrderId(orderId);
        return orderItems.stream()
                .map(this::mapToOrderItemResponseDTO)
                .collect(Collectors.toList());
    }

    // Cambiar el modificador de acceso a public
    public OrderItemResponseDTO mapToOrderItemResponseDTO(OrderItem orderItem) {
        OrderItemResponseDTO orderItemResponseDTO = new OrderItemResponseDTO();
        orderItemResponseDTO.setItemId(orderItem.getItem().getId());
        orderItemResponseDTO.setItemName(orderItem.getItem().getName());
        orderItemResponseDTO.setQuantity(orderItem.getQuantity());
        orderItemResponseDTO.setPrice(orderItem.getPrice());

        return orderItemResponseDTO;
    }
}