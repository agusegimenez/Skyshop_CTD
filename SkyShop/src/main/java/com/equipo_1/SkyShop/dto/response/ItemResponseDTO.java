package com.equipo_1.SkyShop.dto.response;

import com.equipo_1.SkyShop.entity.CartItem;
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
public class ItemResponseDTO {
    private Long id;
    private String name;
    private Float price;
    private String description;
    private String category;
    private Set<CartItemResponseDTO> cartItems = new HashSet<>();
    private String image;
}
