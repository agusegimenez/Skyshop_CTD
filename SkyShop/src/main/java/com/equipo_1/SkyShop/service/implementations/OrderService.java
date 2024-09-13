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
        // Verificamos que el usuario exista
        User user = userRepository.findById(orderRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Validamos que el usuario no tenga más de 2 órdenes pendientes
        long pendingOrdersCount = orderRepository.countByUserIdAndStatus(user.getId(), OrderStatus.PENDING);
        if (pendingOrdersCount >= 2) {
            throw new IllegalStateException("You cannot create more than 2 pending orders.");
        }

        LocalDateTime orderStartTime = LocalDateTime.now();
        LocalDateTime orderEndTime = orderStartTime.plusHours(1);

        // Validamos que la fecha no esté bloqueada
        boolean isBlocked = calendarService.isDateBlocked(orderStartTime, orderEndTime);
        if (isBlocked) {
            throw new IllegalStateException("The selected date and time are not available.");
        }

        // Verificamos la información del item
        ItemRequestDTO itemRequestDTO = orderRequestDTO.getItem();
        if (itemRequestDTO == null) {
            throw new IllegalArgumentException("Item information is missing.");
        }

        // Verificamos si el item ya existe en la base de datos
        Item item = itemRepository.findByName(itemRequestDTO.getName())
                .orElseGet(() -> {
                    Item newItem = new Item();
                    newItem.setName(itemRequestDTO.getName());
                    newItem.setPrice(itemRequestDTO.getPrice());
                    newItem.setDescription(itemRequestDTO.getDescription());
                    newItem.setCategory(Categories.valueOf(itemRequestDTO.getCategory()));
                    newItem.setImages(itemRequestDTO.getImages());
                    return itemRepository.save(newItem);
                });

        // Creamos la orden
        Order order = new Order();
        order.setUser(user);
        order.setItem(item);
        order.setStatus(OrderStatus.PENDING);
        order.setTotal(item.getPrice());
        order.setOrderedAt(orderStartTime);

        // Guardamos la orden en la base de datos
        Order savedOrder = orderRepository.save(order);

        // Bloqueamos el rango de fechas en el calendario
        BlockDateRequestDTO blockDateRequestDTO = new BlockDateRequestDTO(
                orderStartTime.minusHours(1),
                orderEndTime.plusHours(1)
        );
        calendarService.blockDate(blockDateRequestDTO);

        // Enviamos un correo de confirmación al usuario
        try {
            String subject = "Reserva Exitosa en SkyShop";
            String body = "Hola " + user.getUsername() + ",\n\nTu reserva ha sido realizada con éxito.\n\nDetalles de la Orden:\nItem: " + item.getName() +
                    "\nPrecio: $" + item.getPrice() + "\nFecha y Hora del Envío: " + savedOrder.getOrderedAt() + "\n\nGracias por comprar en SkyShop!";
            EmailRequest emailRequest = new EmailRequest(user.getEmail(), subject, body);
            emailService.sendEmail(emailRequest);
        } catch (Exception e) {
            throw new RuntimeException("Error sending confirmation email", e);
        }

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

    // Mapeo de la entidad Order al DTO de respuesta
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

    // Mapeo de la entidad Item al DTO de respuesta
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

    // Obtener órdenes por ID de usuario
    public List<OrderResponseDTO> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(order -> new OrderResponseDTO(
                        order.getId(),
                        order.getUser().getId(),
                        // Convertir el item a ItemResponseDTO
                        mapToItemResponseDTO(order.getItem()),
                        order.getTotal(),
                        order.getOrderedAt().toString(),
                        order.getStatus().name()))
                .collect(Collectors.toList());
    }
}