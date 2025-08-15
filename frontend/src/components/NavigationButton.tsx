import { ChevronRightIcon } from "@/assets/icons";
import usePressDetection from "@/hooks/usePressDetection";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router";
const { color, typography } = theme;

interface NavigationButtonProps {
  navigate: string;
}
const NavigationButton = ({ navigate }: NavigationButtonProps) => {
  const [isPressing, setIsPressing] = useState(false);
  const handlers = usePressDetection({
    setIsPressing,
  });
  return (
    <Link to={navigate} css={ButtonContainer(isPressing)} {...handlers}>
      <p>바로가기</p>
      <ChevronRightIcon />
    </Link>
  );
};

export default NavigationButton;

const ButtonContainer = (isPressing: boolean) => css`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid ${color.GrayScale.gray5};
  font: ${typography.Label.l1_semi};
  cursor: pointer;
  transition:
    background-color 0.25s ease,
    color 0.25s ease;

  background: ${isPressing ? color.GrayScale.black : color.GrayScale.white};
  svg {
    stroke: ${isPressing ? color.GrayScale.white : color.GrayScale.black};
  }
  &,
  &:visited,
  &:link {
    color: ${isPressing ? color.GrayScale.white : color.GrayScale.gray5};
  }

  ${!isPressing &&
  css`
    &:hover {
      background: ${color.GrayScale.gray5};
      color: ${color.GrayScale.white};

      svg {
        stroke: ${color.GrayScale.white};
      }
    }
  `}
`;
