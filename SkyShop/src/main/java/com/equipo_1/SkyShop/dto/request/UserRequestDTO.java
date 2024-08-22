package com.equipo_1.SkyShop.dto.request;

import com.equipo_1.SkyShop.entity.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    private UserRole role;
    private String username;
    private String email;
    private String password;
}