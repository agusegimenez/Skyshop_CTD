package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.dto.request.ItemRequestDTO;
import com.equipo_1.SkyShop.dto.request.OrderRequestDTO;
import com.equipo_1.SkyShop.dto.response.ItemResponseDTO;
import com.equipo_1.SkyShop.dto.response.OrderResponseDTO;
import com.equipo_1.SkyShop.entity.Item;
import com.equipo_1.SkyShop.entity.Order;
import com.equipo_1.SkyShop.entity.User;
import com.equipo_1.SkyShop.entity.enums.Categories;
import com.equipo_1.SkyShop.entity.enums.OrderStatus;
import com.equipo_1.SkyShop.repository.OrderRepository;
import com.equipo_1.SkyShop.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO) {
        // Obtener el usuario desde el repositorio
        User user = userRepository.findById(orderRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Verificar cuántos pedidos en estado PENDING tiene el usuario
        long pendingOrdersCount = orderRepository.countByUserIdAndStatus(user.getId(), OrderStatus.PENDING);

        if (pendingOrdersCount >= 2) {
            throw new RuntimeException("You cannot create more than 2 pending orders.");
        }

        // Aquí iría la lógica para crear el pedido y guardarlo en la base de datos

        // Asignar el estado inicial como PENDING
        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PENDING);
        // Lógica para agregar los items al pedido y calcular el total
        order.setItems(mapItemsFromDTO(orderRequestDTO.getItems()));
        order.setTotal(calculateTotal(order.getItems()));
        order.setOrderedAt(LocalDateTime.now());

        Order savedOrder = orderRepository.save(order);

        return mapToOrderResponseDTO(savedOrder);
    }

    private Set<Item> mapItemsFromDTO(Set<ItemRequestDTO> itemRequestDTOs) {
        return itemRequestDTOs.stream().map(this::mapToItem).collect(Collectors.toSet());
    }

    private Item mapToItem(ItemRequestDTO itemRequestDTO) {
        Item item = new Item();
        item.setName(itemRequestDTO.getName());
        item.setPrice(itemRequestDTO.getPrice());
        item.setDescription(itemRequestDTO.getDescription());
        item.setCategory(Categories.valueOf(itemRequestDTO.getCategory()));
        item.setImage(itemRequestDTO.getImage());
        return item;
    }

    private double calculateTotal(Set<Item> items) {
        return items.stream().mapToDouble(Item::getPrice).sum();
    }
    private OrderResponseDTO mapToOrderResponseDTO(Order savedOrder) {
        OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
        orderResponseDTO.setId(savedOrder.getId());
        orderResponseDTO.setClientId(savedOrder.getUser().getId());
        orderResponseDTO.setItems(savedOrder.getItems().stream()
                .map(this::mapToItemResponseDTO)
                .collect(Collectors.toSet()));
        orderResponseDTO.setTotal(savedOrder.getTotal());
        orderResponseDTO.setOrderedAt(savedOrder.getOrderedAt().toString());
        orderResponseDTO.setStatus(savedOrder.getStatus().name());

        return orderResponseDTO;
    }

    private ItemResponseDTO mapToItemResponseDTO(Item item) {
        ItemResponseDTO itemResponseDTO = new ItemResponseDTO();
        itemResponseDTO.setId(item.getId());
        itemResponseDTO.setName(item.getName());
        itemResponseDTO.setPrice(item.getPrice());
        itemResponseDTO.setDescription(item.getDescription());
        itemResponseDTO.setCategory(String.valueOf(item.getCategory()));
        itemResponseDTO.setImage(item.getImage());

        return itemResponseDTO;
    }
}
