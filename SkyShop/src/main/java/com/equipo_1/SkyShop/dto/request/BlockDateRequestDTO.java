package com.equipo_1.SkyShop.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BlockDateRequestDTO {

    private LocalDateTime startDate;
    private LocalDateTime endDate;
}