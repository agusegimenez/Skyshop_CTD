package com.equipo_1.SkyShop.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemRequestDTO {
    private String name;
    private Float price;
    private String description;
    private String category;
    private List<String> images;
    private List<String> characteristics;
}
