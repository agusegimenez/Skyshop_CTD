package com.equipo_1.SkyShop.repository;

import com.equipo_1.SkyShop.entity.Order;
import com.equipo_1.SkyShop.entity.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    long countByUserIdAndStatus(Long userId, OrderStatus status);
    List<Order> findByUserId(Long userId);
    List<Order> findByStatus(OrderStatus status);
}
