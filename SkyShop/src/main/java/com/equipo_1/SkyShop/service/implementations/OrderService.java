package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.dto.request.BlockDateRequestDTO;
import com.equipo_1.SkyShop.dto.request.ItemRequestDTO;
import com.equipo_1.SkyShop.dto.request.OrderRequestDTO;
import com.equipo_1.SkyShop.dto.response.ItemResponseDTO;
import com.equipo_1.SkyShop.dto.response.OrderResponseDTO;
import com.equipo_1.SkyShop.entity.EmailRequest;
import com.equipo_1.SkyShop.entity.Item;
import com.equipo_1.SkyShop.entity.Order;
import com.equipo_1.SkyShop.entity.User;
import com.equipo_1.SkyShop.entity.enums.Categories;
import com.equipo_1.SkyShop.entity.enums.OrderStatus;
import com.equipo_1.SkyShop.repository.ItemRepository;
import com.equipo_1.SkyShop.repository.OrderRepository;
import com.equipo_1.SkyShop.repository.UserRepository;
import com.equipo_1.SkyShop.service.implementations.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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
    private ItemRepository itemRepository;
    @Autowired
    private EmailService emailService;

    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO) {
        User user = userRepository.findById(orderRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        long pendingOrdersCount = orderRepository.countByUserIdAndStatus(user.getId(), OrderStatus.PENDING);
        if (pendingOrdersCount >= 2) {
            throw new RuntimeException("You cannot create more than 2 pending orders.");
        }

        LocalDateTime orderStartTime = LocalDateTime.now();
        LocalDateTime orderEndTime = orderStartTime.plusHours(1);

        boolean isBlocked = calendarService.isDateBlocked(orderStartTime, orderEndTime);
        if (isBlocked) {
            throw new RuntimeException("The selected date and time are not available.");
        }

        ItemRequestDTO itemRequestDTO = orderRequestDTO.getItem();
        if (itemRequestDTO == null) {
            throw new RuntimeException("Item information is missing.");
        }

        Item item = new Item();
        item.setName(itemRequestDTO.getName());
        item.setPrice(itemRequestDTO.getPrice());
        item.setDescription(itemRequestDTO.getDescription());
        item.setCategory(Categories.valueOf(itemRequestDTO.getCategory()));
        item.setImages(itemRequestDTO.getImages());

        Item savedItem = itemRepository.save(item);

        Order order = new Order();
        order.setUser(user);
        order.setItem(savedItem);
        order.setStatus(OrderStatus.PENDING);
        order.setTotal(savedItem.getPrice());
        order.setOrderedAt(orderStartTime);

        Order savedOrder = orderRepository.save(order);

        BlockDateRequestDTO blockDateRequestDTO = new BlockDateRequestDTO(
                orderStartTime.minusHours(1),
                orderEndTime.plusHours(1)
        );
        calendarService.blockDate(blockDateRequestDTO);

        // Enviamos el email con los detalles del pedido
        String subject = "Reserva Exitosa en SkyShop";
        String body = "Hola " + user.getUsername() + ",\n\nTu reserva ha sido realizada con éxito.\n\nDetalles de la Orden:\nItem: " + savedItem.getName() +
                "\nPrecio: $" + savedItem.getPrice() + "\nFecha y Hora del Envío: " + savedOrder.getOrderedAt() + "\n\nGracias por comprar en SkyShop!";
        EmailRequest emailRequest = new EmailRequest(user.getEmail(), subject, body);
        emailService.sendEmail(emailRequest);  // Se envia aca

        return mapToOrderResponseDTO(savedOrder);
    }

    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        BlockDateRequestDTO blockDateRequestDTO = new BlockDateRequestDTO(
                order.getOrderedAt().minusHours(1),
                order.getOrderedAt().plusHours(1)
        );
        calendarService.unblockDate(order.getId());

        orderRepository.delete(order);
    }

    public OrderResponseDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return mapToOrderResponseDTO(order);
    }

    public List<OrderResponseDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::mapToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    private OrderResponseDTO mapToOrderResponseDTO(Order savedOrder) {
        OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
        orderResponseDTO.setId(savedOrder.getId());
        orderResponseDTO.setClientId(savedOrder.getUser().getId());
        orderResponseDTO.setItem(mapToItemResponseDTO(savedOrder.getItem())); // Mapea un solo item
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
        itemResponseDTO.setImages(item.getImages());

        return itemResponseDTO;
    }
}