package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.dto.request.BlockDateRequestDTO;
import com.equipo_1.SkyShop.dto.response.BlockedDateResponseDTO;
import com.equipo_1.SkyShop.entity.BlockedDate;
import com.equipo_1.SkyShop.repository.BlockedDateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CalendarService {

    @Autowired
    private BlockedDateRepository blockedDateRepository;

    public void blockDate(BlockDateRequestDTO blockDateRequestDTO) {
        BlockedDate blockedDate = new BlockedDate();
        blockedDate.setStartTime(blockDateRequestDTO.getStartTime());
        blockedDate.setEndTime(blockDateRequestDTO.getEndTime());

        blockedDateRepository.save(blockedDate);
    }

    public void unblockDate(BlockDateRequestDTO blockDateRequestDTO) {
        List<BlockedDate> blockedDates = blockedDateRepository.findAllByStartTimeBetweenOrEndTimeBetween(
                blockDateRequestDTO.getStartTime(), blockDateRequestDTO.getEndTime(), blockDateRequestDTO.getStartTime(), blockDateRequestDTO.getEndTime()
        );

        for (BlockedDate blockedDate : blockedDates) {
            blockedDateRepository.delete(blockedDate);
        }
    }

    public boolean isDateBlocked(LocalDateTime startTime, LocalDateTime endTime) {
        List<BlockedDate> blockedDates = blockedDateRepository.findAllByStartTimeBetweenOrEndTimeBetween(
                startTime, endTime, startTime, endTime
        );
        return !blockedDates.isEmpty();
    }

    public List<BlockedDateResponseDTO> getBlockedDates() {
        List<BlockedDate> blockedDates = blockedDateRepository.findAll();
        return blockedDates.stream()
                .map(blockedDate -> new BlockedDateResponseDTO(
                        blockedDate.getId(),
                        blockedDate.getStartTime(),
                        blockedDate.getEndTime()
                ))
                .collect(Collectors.toList());
    }
}