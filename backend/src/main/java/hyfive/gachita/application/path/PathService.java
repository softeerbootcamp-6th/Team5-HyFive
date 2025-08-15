package hyfive.gachita.application.path;

import hyfive.gachita.application.path.respository.PathRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PathService {
    private final PathRepository pathRepository;
}
