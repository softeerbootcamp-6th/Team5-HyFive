import type { CarFormValues } from "@/features/carUploader/useCarForm";
import { clientInstance } from "@/utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const usePostCar = () => {
  const mutation = useMutation({
    mutationFn: (carData: CarFormValues) => {
      const formData = new FormData();
      formData.append("centerId", "2");
      formData.append("modelName", carData.carModel);
      formData.append("carNumber", carData.carNumber);
      formData.append("capacity", carData.maxPassenger);
      formData.append("lowFloor", String(carData.isLowFloor));
      formData.append("imageFile", carData.carImage as File);
      return clientInstance.post("/car", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
  return {
    mutate: mutation.mutate,
  };
};

export const usePatchCar = () => {
  const mutation = useMutation({
    mutationFn: ({
      id,
      values: carData,
    }: {
      id: number;
      values: CarFormValues;
    }) => {
      const formData = new FormData();
      formData.append("modelName", carData.carModel);
      formData.append("carNumber", carData.carNumber);
      formData.append("capacity", carData.maxPassenger);
      formData.append("lowFloor", String(carData.isLowFloor));
      formData.append("imageFile", carData.carImage as File);
      return clientInstance.patch(`/car/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
  return {
    mutate: mutation.mutate,
  };
};
