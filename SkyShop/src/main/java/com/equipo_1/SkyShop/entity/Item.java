package com.equipo_1.SkyShop.entity;

import com.equipo_1.SkyShop.entity.enums.Categories;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Float price;
    private String description;

    @Enumerated(EnumType.STRING)
    private Categories category;

    @ElementCollection
    @CollectionTable(name = "item_images", joinColumns = @JoinColumn(name = "item_id"))
    @Column(name = "image")
    private List<String> images = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "item_characteristics", joinColumns = @JoinColumn(name = "item_id"))
    @Column(name = "characteristic")
    private List<String> characteristics = new ArrayList<>();
}