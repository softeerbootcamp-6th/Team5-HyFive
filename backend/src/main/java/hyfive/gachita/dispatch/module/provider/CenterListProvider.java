package hyfive.gachita.dispatch.module.provider;

import hyfive.gachita.application.center.repository.CenterRepository;
import hyfive.gachita.dispatch.dto.FilteredCenterDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class CenterListProvider {
    private final CenterRepository centerRepository;

    public List<FilteredCenterDto> getAll() {
        log.info("모든 센터 정보 조회 시작");
        List<FilteredCenterDto> centerList = centerRepository.findAll().stream()
                .map(FilteredCenterDto::from)
                .collect(Collectors.toList());
        log.info("모든 센터 정보 조회 완료. 조회된 센터: {}개", centerList.size());
        return centerList;
    }
}
