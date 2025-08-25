package hyfive.gachita.application.common.util;

import java.util.Optional;

public class AddressParser {
    public static Optional<String> extractRoadAddress(String address) {
        if (address == null || address.isBlank()) {
            return Optional.empty();
        }

        String trimmed = address.trim();

        if (trimmed.matches(".*[시].*[구].*")) {
            String[] parts = trimmed.split("\\s+", 3);
            if (parts.length == 3) {
                return Optional.of(parts[2]);
            }
        }

        return Optional.of(trimmed);
    }
}