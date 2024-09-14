package com.equipo_1.SkyShop.dto.request;

import com.equipo_1.SkyShop.dto.response.CartItemResponseDTO;
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
public class CartRequestDTO {
    private Long id;
    private Long userId;
    private Set<CartItemRequestDTO> cartItems;
}
