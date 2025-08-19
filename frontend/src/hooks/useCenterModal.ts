import { useState } from "react";

type ModalKind = "edit" | "delete" | "done" | null;

export const useCenterModal = () => {
  const [modalState, setModalState] = useState<ModalKind>(null);

  const openEdit = () => setModalState("edit");
  const openDelete = () => setModalState("delete");
  const openDone = () => setModalState("done");
  const close = () => setModalState(null);

  const is = (kind: Exclude<ModalKind, null>) => modalState === kind;

  return { modalState, openEdit, openDelete, openDone, close, is };
};
