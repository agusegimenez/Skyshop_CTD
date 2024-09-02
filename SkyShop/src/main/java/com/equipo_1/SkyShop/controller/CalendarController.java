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
        List<BlockedDateResponseDTO> blockedDates = calendarService.getBlockedDates();
        return ResponseEntity.ok(blockedDates);
    }

    // BloquearFecha
    @PostMapping("/block-date")
    public ResponseEntity<Void> blockDate(@RequestBody BlockDateRequestDTO blockDateRequestDTO) {
        calendarService.blockDate(blockDateRequestDTO);
        return ResponseEntity.noContent().build();
    }

    // DesbloquearFecha
    @DeleteMapping("/unblock-date/{id}")
    public ResponseEntity<Void> unblockDate(@PathVariable Long id) {
        calendarService.unblockDate(id);
        return ResponseEntity.noContent().build();
    }
}