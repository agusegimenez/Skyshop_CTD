package com.equipo_1.SkyShop.repository;

import com.equipo_1.SkyShop.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {}