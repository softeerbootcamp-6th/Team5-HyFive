import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const useCarForm = () => {
  const carSchema = z.object({
    carModel: z.string().min(1, "필수 입력값입니다"),
    carNumber: z
      .string()
      .refine((value) => /^\d{2,3}[가-힣]\d{4}$/.test(value), {
        message: "올바른 차량 번호 형식이 아닙니다 (예: 12가3456)",
      }),
    maxPassenger: z.string().refine((value) => value !== "", {
      message: "필수 입력값입니다",
    }),
    isLowFloor: z.boolean(),
  });

  const { register, control, handleSubmit, reset, formState } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(carSchema),
    defaultValues: {
      carModel: "",
      carNumber: "",
      maxPassenger: "",
      isLowFloor: false,
    },
  });

  return { register, control, handleSubmit, reset, formState };
};

export default useCarForm;
