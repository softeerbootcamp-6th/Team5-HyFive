package hyfive.gachita.rental;

import hyfive.gachita.common.response.BaseResponse;
import hyfive.gachita.docs.RentalDocs;
import hyfive.gachita.rental.dto.ReplaceRental;
import hyfive.gachita.rental.dto.RentalRes;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rental")
@RequiredArgsConstructor
public class RentalController implements RentalDocs {
    private final RentalService rentalService;

    @PostMapping
    public BaseResponse<List<RentalRes>> replaceWeeklyRentals(
            @RequestParam("car_id") @NotNull(message = "차량 id는 필수입니다.") Long carId,
            @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate targetDate,
            @RequestBody List<ReplaceRental> rentalList
    ) {
        List<RentalRes> replaceResult = rentalService.replaceWeeklyRentals(carId, targetDate, rentalList);
        return BaseResponse.success(replaceResult);
    }

}