package hyfive.gachita.application.car.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import org.springframework.web.multipart.MultipartFile;

@Schema(description = "차량 수정 요청 DTO")
public record UpdateCarReq(
        @NotBlank
        @Schema(description = "차량 모델명", example = "기아 레이")
        String modelName,

        @NotBlank
        @Pattern(regexp = "^[0-9가-힣\\s-]{1,20}$")
        @Schema(description = "차량 번호", example = "12가 3456")
        String carNumber,

        @Min(1)
        @Max(25)
        @Schema(description = "탑승 가능 인원 수", example = "3")
        int capacity,

        @NotNull
        @Schema(description = "저상 차량 여부", example = "false")
        Boolean lowFloor,

        @NotNull
        @Schema(description = "차량 이미지 파일", example = "이미지는 최대 10MB까지 첨부 가능합니다")
        MultipartFile imageFile
) {}

