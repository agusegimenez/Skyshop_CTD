package com.equipo_1.SkyShop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
    private Long id;
    private Long clientId;
    private ItemResponseDTO item;
    private double total;
    private String orderedAt;
    private String status;
}