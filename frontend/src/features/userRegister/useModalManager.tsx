import { useState } from "react";
import Modal from "@/components/Modal";
import LoadingSpinner from "@/components/LoadingSpinner";
import ModalContent from "@/components/ModalContent";
import { useNavigate } from "react-router";

interface UseModalManagerProps {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  data?: { message?: string };
  error?: Error | null;
  reset: () => void;
}

export const useModalManager = ({
  isPending,
  isSuccess,
  isError,
  data,
  error,
  reset,
}: UseModalManagerProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleSuccessButton = () => {
    setIsModalOpen(false);
    reset();
    void navigate("/admin/book");
  };

  const renderModal = () => (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      {isPending && <LoadingSpinner size="large" />}

      {isSuccess && (
        <ModalContent
          content={data?.message ?? "등록이 완료되었어요."}
          onClose={handleSuccessButton}
        />
      )}

      {isError && (
        <ModalContent
          type="alert"
          content={
            error?.message ??
            "요청 처리 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요."
          }
          onClose={handleCloseModal}
        />
      )}
    </Modal>
  );

  return {
    isModalOpen,
    openModal,
    handleCloseModal,
    renderModal,
  };
};
