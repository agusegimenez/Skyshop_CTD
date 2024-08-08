package com.equipo_1.SkyShop.dto.request;

import com.equipo_1.SkyShop.entity.CartItem;
import com.equipo_1.SkyShop.entity.enums.Categories;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
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
public class ItemRequestDTO {
    private String name;
    private Float price;
    private String description;
    private String category;
    private String image;
}
