package com.equipo_1.SkyShop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartResponseDTO {
    private Long id;
    private Long userId;
    private Set<CartItemResponseDTO> cartItems;
    private String createdAt;
}
