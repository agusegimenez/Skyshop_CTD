package com.equipo_1.SkyShop.repository;

import com.equipo_1.SkyShop.entity.BlockedDate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BlockedDateRepository extends JpaRepository<BlockedDate, Long> {
    boolean existsByStartTimeBetweenOrEndTimeBetween(LocalDateTime start, LocalDateTime end, LocalDateTime start2, LocalDateTime end2);
}