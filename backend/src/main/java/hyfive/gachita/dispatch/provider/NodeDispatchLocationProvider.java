package hyfive.gachita.dispatch.provider;

import hyfive.gachita.dispatch.dto.DispatchLocation;
import hyfive.gachita.dispatch.module.filter.condition.PathCondition;
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

    public List<Long> getByCondition(PathCondition pathCondition) {
        return pathRepository.searchPathList(pathCondition);
    }
}