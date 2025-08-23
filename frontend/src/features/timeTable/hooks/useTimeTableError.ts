import { useState, useEffect } from "react";

export const useTimeTableError = (
  error: Error | null,
  fetchError: Error | null,
) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    if (error || fetchError) {
      setErrorMessage(
        error?.message ||
          fetchError?.message ||
          "시간표 데이터를 불러오는데 실패했습니다.",
      );
      setIsErrorModalOpen(true);
    }
  }, [error, fetchError]);

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    setErrorMessage("");
  };

  return {
    errorMessage,
    isErrorModalOpen,
    handleCloseErrorModal,
  };
};
