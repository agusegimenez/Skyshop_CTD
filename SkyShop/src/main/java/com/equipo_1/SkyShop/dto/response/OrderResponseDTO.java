package com.equipo_1.SkyShop.dto.response;

import com.equipo_1.SkyShop.dto.request.ItemRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
    private Long id;
    private Long clientId;
    private Set<ItemResponseDTO> items = new HashSet<>();
    private double total;
    private String orderedAt;
    private String status;
}
