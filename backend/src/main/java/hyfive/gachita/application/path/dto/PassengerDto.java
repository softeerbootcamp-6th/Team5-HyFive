package hyfive.gachita.application.path.dto;

import lombok.Builder;

import java.time.LocalTime;

@Builder
public record PassengerDto(
        String name, // 탑승객 이름
        String phoneNumber, // 탑승객 전화번호
        boolean walker, // 탑승객 보행기구 유무
        LocalTime onTime, // 탑승예정시간
        LocalTime offTime // 하차예정시간
) {
}
