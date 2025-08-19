import CarModalContent from "@/components/CarModalContent";
import ModalContent from "@/components/ModalContent";
import { useState } from "react";

type ModalKind = "edit" | "delete" | "done" | null;

export const useCenterModal = () => {
  const [modalState, setModalState] = useState<ModalKind>(null);

  const createModalContent = (handlers: {
    close: () => void;
    handleEditConfirm: () => void;
    handleDeleteConfirm: () => void;
  }) => {
    if (!modalState) return null;

    const contents = {
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
      done: <ModalContent onClose={close} content="삭제되었습니다." />,
    };

    return contents[modalState];
  };

  return {
    modalState,
    openEditModal: () => setModalState("edit"),
    openDeleteModal: () => setModalState("delete"),
    openDoneModal: () => setModalState("done"),
    closeModal: () => setModalState(null),
    createModalContent,
  };
};
