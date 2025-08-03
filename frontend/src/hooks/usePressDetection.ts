import { useCallback, useRef } from "react";

interface UsePressDetectionProps {
  handleLongPress?: () => void;
  handleShortPress?: () => void;
  delay?: number;
  setIsPressing?: (isPressing: boolean) => void;
}
const usePressDetection = ({
  handleLongPress = () => {},
  handleShortPress = () => {},
  delay = 500,
  setIsPressing = () => {},
}: UsePressDetectionProps) => {
  const rafIdRef = useRef(0);
  const timerRef = useRef(0);
  const isLongPressRef = useRef(false);

  const loop = useCallback((timestamp: number) => {
    if (!timerRef.current) timerRef.current = timestamp;
    const elapsed = timestamp - timerRef.current;

    if (elapsed >= delay) {
      isLongPressRef.current = true;
      handleLongPress();
    } else {
      rafIdRef.current = requestAnimationFrame(loop);
    }
  }, []);

  const startAction = useCallback(() => {
    isLongPressRef.current = false;
    timerRef.current = 0;
    setIsPressing(true);
    rafIdRef.current = requestAnimationFrame(loop);
  }, []);

  const endAction = () => {
    cancelAnimationFrame(rafIdRef.current);
    if (!isLongPressRef.current) {
      handleShortPress();
    }
    timerRef.current = 0;
    setIsPressing(false);
  };

  return {
    onMouseDown: startAction,
    onTouchStart: startAction,
    onMouseUp: endAction,
    onTouchEnd: endAction,
  };
};

export default usePressDetection;
