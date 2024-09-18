package com.equipo_1.SkyShop.dto.response;

import com.equipo_1.SkyShop.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartResponseDTO {
    private Long id;
    private Long userId;
    private Map<Long, Integer> items; // Mapa de itemId a cantidad
    private LocalDateTime createdAt;
}
