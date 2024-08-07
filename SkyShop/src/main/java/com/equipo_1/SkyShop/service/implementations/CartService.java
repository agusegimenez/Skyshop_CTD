package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.dto.request.CartRequestDTO;
import com.equipo_1.SkyShop.dto.response.CartResponseDTO;
import com.equipo_1.SkyShop.repository.CartRepository;
import com.equipo_1.SkyShop.service.ICartService;
import org.apache.logging.log4j.Logger;

import java.util.List;
import java.util.Optional;

public class CartService implements ICartService {

    // private static final Logger LOGGER = Logger.getLogger((CartService.class));
    private CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public CartResponseDTO save(CartRequestDTO cart) {
        return null;
    }

    @Override
    public Optional<CartResponseDTO> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<CartResponseDTO> list() {
        return null;
    }

    @Override
    public void update(CartRequestDTO cart) {

    }

    @Override
    public void delete(Long id) {

    }
}
