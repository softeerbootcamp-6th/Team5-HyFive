package hyfive.gachita.application.node.dto;

public record NodePair(
        Long startId,
        Long endId
) {

    public String key() {
        return startId + "-" + endId;
    }

    @Override
    public String toString() {
        return "NodePair[" + startId + " → " + endId + "]";
    }
}

