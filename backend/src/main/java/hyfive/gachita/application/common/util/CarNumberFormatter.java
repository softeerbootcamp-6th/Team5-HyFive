package hyfive.gachita.application.common.util;

public final class CarNumberFormatter {
    /**
     * 차량 번호에서 모든 공백 및 하이픈을 제거합니다.
     *
     * 예:
     *  - 입력: "12 가 3456" → 출력: "12가3456"
     *  - 입력: "  12가 - 3456 " → 출력: "12가3456"
     *
     * @param carNumber 사용자 입력 차량 번호
     * @return 정규화된 차량 번호 (공백 및 하이픈 제거)
     */
    public static String normalize(String carNumber) {
        return carNumber.replaceAll("[\\s-]", "");
    }

    /**
     * 차량 번호에 공백을 추가하여 포맷합니다.
     *
     * 예:
     *  - 입력: "12가3456" → 출력: "12가 3456"
     *  - 입력: "123나6789" → 출력: "123나 6789"
     *
     * @param carNumber 정규화된 차량 번호 (공백 없음)
     * @return 포맷된 차량 번호 (예: "12가 3456")
     */
    public static String format(String carNumber) {
        return carNumber.replaceFirst("^(\\d{2,3}[가-힣])(\\d{4})$", "$1 $2");
    }
}