package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.center.repository.CenterRepository;
import hyfive.gachita.dispatch.dto.CenterDispatchLocationDto;
import hyfive.gachita.dispatch.dto.DispatchLocation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CenterDispatchLocationProvider implements DispatchLocationProvider {

    private final CenterRepository centerRepository;

    @Override
    public List<DispatchLocation> getAll() {
        return centerRepository.findAll().stream()
                .<DispatchLocation>map(CenterDispatchLocationDto::from)
                .collect(Collectors.toList());
    }
}