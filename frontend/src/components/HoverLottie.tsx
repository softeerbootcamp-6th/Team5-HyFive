import Lottie, {
  type AnimationConfigWithData,
  type AnimationItem,
} from "lottie-web";
import { useEffect, useRef } from "react";

interface HoverLottieProps {
  animationData: AnimationConfigWithData["animationData"];
}
const HoverLottie = ({ animationData }: HoverLottieProps) => {
  const animationContainer = useRef<HTMLDivElement | null>(null);
  const animationInstance = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!animationContainer.current) return;

    const animation = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: "xMinYMin slice",
      },
    });
    animationInstance.current = animation;

    return () => {
      animation.destroy();
      animationInstance.current = null;
    };
  }, [animationData]);

  const handleMouseEnter = () => {
    animationInstance.current?.goToAndPlay(0, true);
  };

  const handleMouseLeave = () => {
    animationInstance.current?.stop();
  };

  return (
    <div
      ref={animationContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default HoverLottie;
