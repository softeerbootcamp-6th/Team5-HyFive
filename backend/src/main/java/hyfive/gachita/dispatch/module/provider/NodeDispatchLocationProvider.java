package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.dispatch.dto.DispatchLocation;
import hyfive.gachita.dispatch.module.condition.Condition;
import hyfive.gachita.dispatch.module.condition.PathCondition;
import hyfive.gachita.path.respository.PathRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class NodeDispatchLocationProvider implements DispatchLocationProvider {

    private final PathRepository pathRepository;

    @Override
    public List<DispatchLocation> getAll() {
        return List.of();
    }

    @Override
    public List<DispatchLocation> getByCondition(Condition pathCondition) {
        return pathRepository.searchPathList((PathCondition) pathCondition).stream()
                .map(dto -> (DispatchLocation) dto)
                .toList();
    }
}