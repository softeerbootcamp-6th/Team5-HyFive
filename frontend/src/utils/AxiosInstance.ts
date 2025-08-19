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
    (response) => response.data,
    (error: AxiosError) => {
      throw CustomError(error);
    },
  );

  return instance;
};

export const clientInstance = createInstance();
