package com.equipo_1.SkyShop.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BlockedDateResponseDTO {

    private Long id;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public BlockedDateResponseDTO(Long id, LocalDateTime startDate, LocalDateTime endDate) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}