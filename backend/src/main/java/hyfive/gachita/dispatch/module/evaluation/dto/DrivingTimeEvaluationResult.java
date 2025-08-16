package hyfive.gachita.dispatch.module.evaluation.dto;

import hyfive.gachita.dispatch.dto.NewBookDto;

public record DrivingTimeEvaluationResult(
        boolean success,
        NewBookDto bookDto,
        String failReason
) {
    public static DrivingTimeEvaluationResult success(NewBookDto dto) {
        return new DrivingTimeEvaluationResult(true, dto, null);
    }
    public static DrivingTimeEvaluationResult fail(String reason) {
        return new DrivingTimeEvaluationResult(false, null, reason);
    }
}
