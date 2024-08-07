package com.equipo_1.SkyShop.dto.response;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientResponseDTO {
    private Long id;
    private String username;
    private String email;
    private String address;
    private Integer phoneNumber;
    private Long cartId;
    private String createdAt;
    private String updatedAt;
}
