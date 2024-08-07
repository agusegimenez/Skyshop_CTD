package com.equipo_1.SkyShop.service;

import com.equipo_1.SkyShop.dto.request.CartRequestDTO;
import com.equipo_1.SkyShop.dto.response.CartResponseDTO;

import java.util.List;
import java.util.Optional;

public interface ICartService {
    CartResponseDTO save(CartRequestDTO cart);
    Optional<CartResponseDTO> findById(Long id);
    List<CartResponseDTO> list();
    void update(CartRequestDTO cart);
    void delete(Long id);
}
