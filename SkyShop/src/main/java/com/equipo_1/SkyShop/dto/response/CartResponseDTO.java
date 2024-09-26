package com.equipo_1.SkyShop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartResponseDTO {
    private Long id;
    private Long userId;
    private Long itemId;  // ID del ítem, si existe
    private Integer quantity; // Cantidad del ítem, si existe
    private LocalDateTime createdAt;
}

