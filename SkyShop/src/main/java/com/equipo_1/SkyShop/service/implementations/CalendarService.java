package com.equipo_1.SkyShop.service.implementations;

import com.equipo_1.SkyShop.dto.request.BlockDateRequestDTO;
import com.equipo_1.SkyShop.dto.response.BlockedDateResponseDTO;
import com.equipo_1.SkyShop.entity.BlockedDate;
import com.equipo_1.SkyShop.repository.BlockedDateRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CalendarService {

    private final BlockedDateRepository blockedDateRepository;

    public CalendarService(BlockedDateRepository blockedDateRepository) {
        this.blockedDateRepository = blockedDateRepository;
    }

    public List<BlockedDateResponseDTO> getBlockedDates() {
        List<BlockedDate> blockedDates = blockedDateRepository.findAll();
        return blockedDates.stream()
                .map(date -> new BlockedDateResponseDTO(
                        date.getId(),
                        date.getStartTime(),
                        date.getEndTime()))
                .collect(Collectors.toList());
    }

    public void blockDate(BlockDateRequestDTO blockDateRequestDTO) {
        BlockedDate blockedDate = new BlockedDate();

        LocalDateTime adjustedStartTime = blockDateRequestDTO.getStartDate().minusHours(1);
        LocalDateTime adjustedEndTime = blockDateRequestDTO.getEndDate().plusHours(1);
        blockedDate.setStartTime(adjustedStartTime);
        blockedDate.setEndTime(adjustedEndTime);
        blockedDateRepository.save(blockedDate);
    }

    public void unblockDate(Long id) {
        blockedDateRepository.deleteById(id);
    }

    public boolean isDateBlocked(LocalDateTime startTime, LocalDateTime endTime) {
        List<BlockedDate> blockedDates = blockedDateRepository.findAll();

        return blockedDates.stream().anyMatch(blockedDate ->
                (startTime.isBefore(blockedDate.getEndTime()) || startTime.isEqual(blockedDate.getEndTime())) &&
                        (endTime.isAfter(blockedDate.getStartTime()) || endTime.isEqual(blockedDate.getStartTime())));
    }
}
