import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type CarFormValues = {
  carImage: File | string | null;
  carModel: string;
  carNumber: string;
  maxPassenger: string;
  isLowFloor: boolean;
};

const emptyValues = {
  carImage: null,
  carModel: "",
  carNumber: "",
  maxPassenger: "",
  isLowFloor: false,
};

const carSchema = z.object({
  carImage: z.any().refine((value) => value !== null && value !== undefined, {
    message: "필수 입력값입니다",
  }),
  carModel: z.string().min(1, "필수 입력값입니다"),
  carNumber: z.string().refine((value) => /^\d{2,3}[가-힣]\d{4}$/.test(value), {
    message: "올바른 차량 번호 형식이 아닙니다 (예: 12가3456)",
  }),
  maxPassenger: z.string().refine((value) => value !== "", {
    message: "필수 입력값입니다",
  }),
  isLowFloor: z.boolean(),
});

const useCarForm = (initValues?: CarFormValues) => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    clearErrors,
    reset,
    formState,
  } = useForm<CarFormValues>({
    mode: "onSubmit",
    resolver: zodResolver(carSchema),
    defaultValues: {
      ...emptyValues,
      ...initValues,
    },
  });

  const handleReset = () => {
    reset(emptyValues);
  };

  return {
    register,
    control,
    watch,
    handleSubmit,
    handleReset,
    clearErrors,
    formState,
  };
};

export default useCarForm;
