package com.equipo_1.SkyShop.dto.request;

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
public class OrderRequestDTO {
    private Long userId;
    private Long cartId; // Añadido para mantener el ID del carrito
    private LocalDateTime startTime; // Fecha y hora de inicio de la reserva
    private LocalDateTime endTime;   // Fecha y hora de fin de la reserva
}
