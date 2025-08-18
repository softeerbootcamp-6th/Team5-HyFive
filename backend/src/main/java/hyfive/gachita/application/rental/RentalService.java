package hyfive.gachita.application.rental;

import hyfive.gachita.application.car.Car;
import hyfive.gachita.application.car.repository.CarRepository;
import hyfive.gachita.application.common.enums.SearchPeriod;
import hyfive.gachita.global.BusinessException;
import hyfive.gachita.global.ErrorCode;
import hyfive.gachita.application.common.util.DateRangeUtil;
import hyfive.gachita.application.rental.dto.ReplaceRental;
import hyfive.gachita.application.rental.dto.RentalRes;
import hyfive.gachita.application.rental.repository.RentalRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RentalService {

    private final RentalRepository rentalRepository;
    private final CarRepository carRepository;

    @Transactional
    public List<RentalRes> replaceWeeklyRentals(Long carId, LocalDate targetDate, List<ReplaceRental> rentalList) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new BusinessException(ErrorCode.NO_EXIST_VALUE, "DB에 차량 데이터가 존재하지 않습니다."));

        if (invalidDuration(rentalList)) {
            throw new BusinessException(ErrorCode.INVALID_DURATION, "유휴시간은 최소 2시간 이상이어야 합니다.");
        }

        Pair<LocalDate, LocalDate> weekRange = DateRangeUtil.getDateRange(targetDate, SearchPeriod.WEEK);
        LocalDate startOfWeek = weekRange.getFirst();
        LocalDate endOfWeek = weekRange.getSecond();

        rentalRepository.deleteRentalsBetween(carId, startOfWeek, endOfWeek);

        List<Rental> rentalsToSave = rentalList.stream()
                .map(dto -> Rental.builder()
                        .car(car)
                        .rentalDate(dto.rentalDate())
                        .rentalStartTime(dto.rentalStartTime())
                        .rentalEndTime(dto.rentalEndTime())
                        .build()
                ).toList();

        return rentalRepository.saveAll(rentalsToSave)
                .stream()
                .map(RentalRes::from).toList();
    }

    public List<RentalRes> getRentalList(Long carId, LocalDate targetDate) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new BusinessException(ErrorCode.NO_EXIST_VALUE, "DB에 차량 데이터가 존재하지 않습니다."));

        Pair<LocalDate, LocalDate> weekRange = DateRangeUtil.getDateRange(targetDate, SearchPeriod.WEEK);
        LocalDate startOfWeek = weekRange.getFirst();
        LocalDate endOfWeek = weekRange.getSecond();

        return rentalRepository.findRentalsBetween(carId, startOfWeek, endOfWeek).stream()
                .map(RentalRes::from)
                .toList();
    }

    private boolean invalidDuration(List<ReplaceRental> rentalList) {
        return rentalList.stream()
                .anyMatch(dto -> Duration.between(dto.rentalStartTime(), dto.rentalEndTime()).toHours() < 2);
    }

}
