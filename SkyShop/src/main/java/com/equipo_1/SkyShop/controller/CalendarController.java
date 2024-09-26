package com.equipo_1.SkyShop.controller;

import com.equipo_1.SkyShop.dto.request.BlockDateRequestDTO;
import com.equipo_1.SkyShop.dto.response.BlockedDateResponseDTO;
import com.equipo_1.SkyShop.service.implementations.CalendarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    private final CalendarService calendarService;

    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    // ListarFechasBloqueadas
    @GetMapping("/blocked-dates")
    public ResponseEntity<List<BlockedDateResponseDTO>> getBlockedDates() {
        List<BlockedDateResponseDTO> blockedDates = calendarService.getBlockedDates(); // Asegúrate de tener este método en el servicio
        return ResponseEntity.ok(blockedDates);
    }

    // BloquearFecha
    @PostMapping("/block-date")
    public ResponseEntity<Void> blockDate(@RequestBody BlockDateRequestDTO blockDateRequestDTO) {
        calendarService.blockDate(blockDateRequestDTO);
        return ResponseEntity.noContent().build();
    }

    // DesbloquearFecha
    @DeleteMapping("/unblock-date")
    public ResponseEntity<Void> unblockDate(@RequestBody BlockDateRequestDTO blockDateRequestDTO) {
        calendarService.unblockDate(blockDateRequestDTO);
        return ResponseEntity.noContent().build();
    }
}