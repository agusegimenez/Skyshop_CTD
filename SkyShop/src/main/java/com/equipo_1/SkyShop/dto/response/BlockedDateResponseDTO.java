package com.equipo_1.SkyShop.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlockedDateResponseDTO {

    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

}