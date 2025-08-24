package hyfive.gachita.dispatch.dto;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "dispatch.radius")
public record RadiusPolicy (
        int initial,
        int step,
        int max,
        int minNodeCount
) { }
