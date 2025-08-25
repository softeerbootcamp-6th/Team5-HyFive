package hyfive.gachita.application.common.util;

import java.util.Optional;

public class AddressParser {
    public static Optional<String> extractRoadAddress(String address) {
        if (address == null || address.isBlank()) {
            return Optional.empty();
        }
        String[] parts = address.trim().split("\\s+");
        if (parts.length < 3) {
            return Optional.empty();
        }
        return Optional.of(parts[parts.length - 2] + " " + parts[parts.length - 1]);
    }
}