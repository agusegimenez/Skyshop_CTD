package com.equipo_1.SkyShop.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDTO {
    private Long userId;
    private List<OrderItemRequestDTO> items; // Lista de items dentro de la orden
    private LocalDateTime startTime; // Fecha y hora de inicio de la reserva
    private LocalDateTime endTime;   // Fecha y hora de fin de la reserva
}
