package com.equipo_1.SkyShop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
    private Long id;
    private Long clientId;
    private Map<Long, Integer> items; // Lista de items
    private String orderedAt;
    private String status;
}