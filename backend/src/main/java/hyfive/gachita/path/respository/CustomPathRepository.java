package hyfive.gachita.path.respository;

import java.time.LocalTime;
import java.util.List;

public interface CustomPathRepository {
    List<Long> getAll(LocalTime maybeOnTime, LocalTime deadline, boolean walker);
}
