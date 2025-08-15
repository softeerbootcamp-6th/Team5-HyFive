package hyfive.gachita.domain.path;

import hyfive.gachita.domain.path.respository.PathRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PathService {
    private final PathRepository pathRepository;
}
