package hyfive.gachita.rental;

import hyfive.gachita.car.Car;
import hyfive.gachita.car.repository.CarRepository;
import hyfive.gachita.common.response.BusinessException;
import hyfive.gachita.common.response.ErrorCode;
import hyfive.gachita.rental.dto.ReplaceRental;
import hyfive.gachita.rental.dto.RentalRes;
import hyfive.gachita.rental.repository.RentalRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
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

        // TODO : SearchPeriod 병합되면 유진님과 enum 확장 논의
        LocalDate startOfWeek = targetDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));
        LocalDate endOfWeek = startOfWeek.plusDays(6);

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

    public List<RentalRes> getWeeklyRentals(Long carId, LocalDate targetDate) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new BusinessException(ErrorCode.NO_EXIST_VALUE, "DB에 차량 데이터가 존재하지 않습니다."));

        // TODO : SearchPeriod 병합되면 유진님과 enum 확장 논의
        LocalDate startOfWeek = targetDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));
        LocalDate endOfWeek = startOfWeek.plusDays(6);

        return rentalRepository.findRentalsBetween(carId, startOfWeek, endOfWeek).stream()
                .map(RentalRes::from)
                .toList();
    }

    private boolean invalidDuration(List<ReplaceRental> rentalList) {
        return rentalList.stream()
                .anyMatch(dto -> Duration.between(dto.rentalStartTime(), dto.rentalEndTime()).toHours() < 2);
    }

}
