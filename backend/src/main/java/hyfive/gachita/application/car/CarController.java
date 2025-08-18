package hyfive.gachita.application.car;

import hyfive.gachita.application.car.dto.CarListRes;
import hyfive.gachita.application.car.dto.CarRes;
import hyfive.gachita.application.car.dto.CreateCarReq;
import hyfive.gachita.application.car.dto.UpdateCarReq;
import hyfive.gachita.global.BaseResponse;
import hyfive.gachita.docs.CarDocs;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/car")
@RequiredArgsConstructor
@Validated
public class CarController implements CarDocs {
    private final CarService carService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public BaseResponse<CarRes> createCar(@ModelAttribute CreateCarReq createCarReq) {
        Car createCar = carService.createCar(createCarReq);
        return BaseResponse.success(CarRes.from(createCar));
    }

    @PatchMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public BaseResponse<CarRes> updateCar(
            @PathVariable("id") @NotNull Long id,
            @ModelAttribute UpdateCarReq updateCarReq) {
        Car updateCar = carService.updateCar(id, updateCarReq);
        return BaseResponse.success(CarRes.from(updateCar));
    }

    @GetMapping("/{id}")
    public BaseResponse<CarRes> getCar(@PathVariable("id") @NotNull Long id) {
        Car getCar = carService.getCar(id);
        return BaseResponse.success(CarRes.from(getCar));
    }

    @GetMapping("/list")
    public BaseResponse<List<CarListRes>> getCarList(
            @RequestParam(name = "center_id") Long centerId
    ) {
        return BaseResponse.success(carService.getCarList(centerId));
    }

    @DeleteMapping("/{id}")
    public BaseResponse<CarRes> deleteCar(@PathVariable("id") @NotNull Long id) {
        Car deleteCar = carService.deleteCar(id);
        return BaseResponse.success(CarRes.from(deleteCar));
    }
}
