package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.application.center.repository.CenterRepository;
import hyfive.gachita.dispatch.dto.InitPathDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CenterListProvider {
    private final CenterRepository centerRepository;

    public List<InitPathDto> getAll() {
        return centerRepository.findAll().stream()
                .map(InitPathDto::from)
                .collect(Collectors.toList());
    }
}
