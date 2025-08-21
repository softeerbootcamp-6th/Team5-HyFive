import type { UserFormData } from "@/features/userRegister/UserRegister.types";
import { clientInstance } from "@/utils/AxiosInstance";
import type { CustomError } from "@/utils/CustomError";
import { useMutation } from "@tanstack/react-query";

interface UserRegisterAPIResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: UserFormData;
}

export const usePostUserRegister = () => {
  return useMutation<UserRegisterAPIResponse, CustomError, UserFormData>({
    mutationFn: (userFormData) =>
      clientInstance.post("/book", userFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
  });
};
