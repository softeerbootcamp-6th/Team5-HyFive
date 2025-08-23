import { CustomError } from "@/utils/CustomError";
import axios, { type AxiosError } from "axios";

const createInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.response.use(
    (response) => {
      if (response.data.isSuccess) {
        return response.data;
      } else {
        throw new CustomError({
          message: response.data.message,
          status: response.data.status,
        });
      }
    },
    (error: AxiosError) => {
      throw new CustomError({
        message: "통신에 문제가 발생했습니다",
        status: error.status,
      });
    },
  );

  return instance;
};

export const clientInstance = createInstance();
