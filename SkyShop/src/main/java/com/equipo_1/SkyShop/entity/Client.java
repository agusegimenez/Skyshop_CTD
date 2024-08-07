package com.equipo_1.SkyShop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "clients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Client extends User {
    private String address;
    @Column(name = "phone_number")
    private Integer phoneNumber;
    @OneToOne(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Cart cart;
}
