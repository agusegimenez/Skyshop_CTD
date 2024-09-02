package com.equipo_1.SkyShop.controller;

import com.equipo_1.SkyShop.dto.request.OrderRequestDTO;
import com.equipo_1.SkyShop.dto.response.OrderResponseDTO;
import com.equipo_1.SkyShop.service.implementations.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequestDTO orderRequestDTO) {
        try {
            OrderResponseDTO orderResponseDTO = orderService.createOrder(orderRequestDTO);
            return new ResponseEntity<>(orderResponseDTO, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
