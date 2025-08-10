package hyfive.gachita.center;

import hyfive.gachita.car.DelYn;
import hyfive.gachita.car.repository.CarRepository;
import hyfive.gachita.common.response.BusinessException;
import hyfive.gachita.common.response.ErrorCode;
import hyfive.gachita.pay.PayService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CenterService {
    private final CenterRepository centerRepository;
    private final CarRepository carRepository;
    private final PayService payService;

    public CenterRes getCenter(Long id) {
        Center center = centerRepository.findById(id)
                .orElseThrow(()-> new BusinessException(ErrorCode.NO_EXIST_VALUE, "DB에 센터 데이터가 존재하지 않습니다."));

        long carCount = carRepository.countByCenterAndDelYn(center, DelYn.N);
        long weeklyPayAmount = payService.getWeeklyPayAmount(center.getId());

        return CenterRes.builder()
                .centerName(center.getCenterName())
                .centerAddr(center.getCenterAddr())
                .centerTel(center.getCenterTel())
                .carCount(carCount)
                .payAmount(weeklyPayAmount)
                .build();
    }
}
