import type { BackendCarType } from "@/features/car/Car.type";
import type { CarFormValues } from "@/features/carUploader/useCarForm";
import { clientInstance } from "@/utils/AxiosInstance";
import type { CustomError } from "@/utils/CustomError";
import { useMutation, useQuery } from "@tanstack/react-query";

interface CarAPIResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    id: number;
    centerId: number;
    modelName: string;
    carNumber: string;
    capacity: number;
    lowFloor: boolean;
    carImage: string;
  };
}

interface CarListAPIResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: BackendCarType[];
}

const CENTER_ID = 1; // MVP 단계에선 고정

export const useGetCarList = (centerId: number = CENTER_ID) => {
  const { data, isFetching, error, refetch } = useQuery<CarListAPIResponse>({
    queryKey: ["carList", centerId],
    queryFn: () => clientInstance.get(`/car/list?center_id=${centerId}`),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const carList = data?.data;

  return { carList, isFetching, error, refetch };
};

export const usePostCar = () => {
  const mutation = useMutation<CarAPIResponse, CustomError, CarFormValues>({
    mutationFn: (carData) => {
      const formData = new FormData();
      formData.append("centerId", "1"); //centerId는 고정되어 있음
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
  const mutation = useMutation<
    CarAPIResponse,
    CustomError,
    {
      id: number;
      values: CarFormValues;
    }
  >({
    mutationFn: ({ id, values: carData }) => {
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

export const useDeleteCar = () => {
  const mutation = useMutation<CarAPIResponse, CustomError, number>({
    mutationFn: (carId) => {
      return clientInstance.delete(`/car/${carId}`);
    },
  });
  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
