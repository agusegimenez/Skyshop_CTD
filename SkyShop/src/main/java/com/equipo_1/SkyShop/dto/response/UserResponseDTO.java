package com.equipo_1.SkyShop.dto.response;

import com.equipo_1.SkyShop.entity.User;
import com.equipo_1.SkyShop.entity.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private Long id;
    private UserRole role;
    private String username;
    private String email;
    private Set<Long> favorites;
    private String createdAt;
    private String updatedAt;
}
