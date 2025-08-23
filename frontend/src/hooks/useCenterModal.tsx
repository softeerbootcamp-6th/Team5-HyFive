import CarModalContent from "@/components/CarModalContent";
import LoadingSpinner from "@/components/LoadingSpinner";
import ModalContent from "@/components/ModalContent";
import { useState } from "react";

type ModalKind = "loading" | "edit" | "delete" | "done" | "error" | null;

export const useCenterModal = () => {
  const [modalState, setModalState] = useState<ModalKind>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const createModalContent = (handlers: {
    close: () => void;
    handleEditConfirm: () => void;
    handleDeleteConfirm: () => void;
  }) => {
    if (!modalState) return null;

    const contents = {
      loading: <LoadingSpinner size="large" />,
      edit: (
        <CarModalContent
          type="edit"
          onClose={handlers.close}
          onConfirm={handlers.handleEditConfirm}
        />
      ),
      delete: (
        <CarModalContent
          type="delete"
          onClose={handlers.close}
          onConfirm={handlers.handleDeleteConfirm}
        />
      ),
      done: <ModalContent onClose={handlers.close} content="삭제되었습니다." />,
      error: (
        <ModalContent
          onClose={handlers.close}
          content={errorMessage || "삭제에 실패했습니다."}
        />
      ),
    };

    return contents[modalState];
  };

  return {
    modalState,
    openEditModal: () => setModalState("edit"),
    openDeleteModal: () => setModalState("delete"),
    openLoadingModal: () => setModalState("loading"),
    openDoneModal: () => setModalState("done"),
    openErrorModal: (errorMessage: string) => {
      setErrorMessage(errorMessage);
      setModalState("error");
    },
    closeModal: () => setModalState(null),
    createModalContent,
  };
};
