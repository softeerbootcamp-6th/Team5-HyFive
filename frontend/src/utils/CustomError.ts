import type { AxiosError } from "axios";

export const CustomError = (error: AxiosError) => {
  return error;
};
