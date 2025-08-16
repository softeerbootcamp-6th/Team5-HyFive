import { useEffect } from "react";

interface useDocumentMouseEventListenerProps {
  finalizeDrag: () => void;
}

/**
 * 문서 레벨 이벤트 리스너를 관리하는 훅
 * 드래그 종료를 위한 mouseup 이벤트 리스너 등록
 */
export const useDocumentMouseEventListener = ({
  finalizeDrag,
}: useDocumentMouseEventListenerProps) => {
  useEffect(() => {
    const onMouseUp = () => finalizeDrag();

    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [finalizeDrag]);
};
