package com.equipo_1.SkyShop.dto.request;

import com.equipo_1.SkyShop.entity.Cart;
import com.equipo_1.SkyShop.entity.Item;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemRequestDTO {
    private Long cartId;
    private Long itemId;
    private int quantity;
}
