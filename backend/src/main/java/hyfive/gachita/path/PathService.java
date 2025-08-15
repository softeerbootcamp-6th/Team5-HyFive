package hyfive.gachita.path;

import hyfive.gachita.path.respository.PathRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PathService {
    private final PathRepository pathRepository;
}
