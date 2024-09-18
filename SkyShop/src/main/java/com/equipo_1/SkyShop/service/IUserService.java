package com.equipo_1.SkyShop.service;

import com.equipo_1.SkyShop.entity.User;

import java.util.Optional;

public interface IUserService {
    User registerUser(User user);
    User loginUser(String email, String password);
    Optional<User> findUserById(Long id);
    boolean toggleFav(Long userId, Long itemId);
}
