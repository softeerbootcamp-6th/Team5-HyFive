import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type CarFormValues = {
  carImage: File | null;
  carModel: string;
  carNumber: string;
  maxPassenger: string;
  isLowFloor: boolean;
};

const EMPTY_VALUES = {
  carImage: null,
  carModel: "",
  carNumber: "",
  maxPassenger: "",
  isLowFloor: false,
};

const carSchema = z.object({
  carImage: z.any().refine((value) => value instanceof File, {
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
  const { register, control, handleSubmit, setError, reset, formState } =
    useForm({
      mode: "onSubmit",
      resolver: zodResolver(carSchema),
      defaultValues: {
        ...EMPTY_VALUES,
        ...initValues,
      },
    });

  const handleReset = () => {
    reset(EMPTY_VALUES);
  };

  return {
    register,
    control,
    handleSubmit,
    handleReset,
    setError,
    formState,
  };
};

export default useCarForm;
