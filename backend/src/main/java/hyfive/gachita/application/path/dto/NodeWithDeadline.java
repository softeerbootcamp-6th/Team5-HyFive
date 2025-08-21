package hyfive.gachita.application.path.dto;

import hyfive.gachita.application.node.Node;

import java.time.LocalTime;

public record NodeWithDeadline(
        Node node,
        LocalTime deadline
) {}
