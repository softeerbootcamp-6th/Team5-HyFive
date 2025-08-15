package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.domain.center.repository.CenterRepository;
import hyfive.gachita.dispatch.dto.DispatchLocation;
import hyfive.gachita.dispatch.dto.InitPathDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class InitPathProvider implements DispatchLocationProvider {
    private final CenterRepository centerRepository;

    @Override
    public List<DispatchLocation> getAll() {
        return centerRepository.findAll().stream()
                .<DispatchLocation>map(InitPathDto::from)
                .collect(Collectors.toList());
    }
}
