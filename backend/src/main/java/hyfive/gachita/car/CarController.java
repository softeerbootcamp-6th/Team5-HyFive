package hyfive.gachita.car;
import hyfive.gachita.car.dto.CarRes;
import hyfive.gachita.car.dto.CreateCarReq;
import hyfive.gachita.common.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/car")
@RequiredArgsConstructor
public class CarController {
    private final CarService carService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public BaseResponse<CarRes> createBook(@ModelAttribute @Validated CreateCarReq createCarReq) {
        Car createCar = carService.createCar(createCarReq);
        return BaseResponse.success(CarRes.from(createCar));
    }
}
