package com.equipo_1.SkyShop.dto.request;

import com.equipo_1.SkyShop.entity.Cart;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientRequestDTO {
    private String username;
    private String email;
    private String password;
    private String address;
    private Integer phoneNumber;
}
