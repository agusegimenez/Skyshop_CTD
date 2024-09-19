package com.equipo_1.SkyShop.dto.response;

import com.equipo_1.SkyShop.entity.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
    private Long id;
    private Long clientId;
    private List<OrderItemResponseDTO> items;  // Lista de ítems en la orden
    private LocalDateTime orderedAt;
    private LocalDateTime deliveryTime;
    private OrderStatus status;
}