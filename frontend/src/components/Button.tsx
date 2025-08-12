import usePressDetection from "@/hooks/usePressDetection";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
import { useState } from "react";
const { color, typography } = theme;

type Color = "gray" | "orange";
type Size = "small" | "big";
interface ButtonProps {
  label: string;
  bgColor?: Color;
  size?: Size;
  type?: "submit" | "button" | "reset";
}

const Button = ({
  label,
  bgColor = "orange",
  size = "small",
  type = "button",
}: ButtonProps) => {
  const [isPressing, setIsPressing] = useState(false);
  const handlers = usePressDetection({
    setIsPressing,
  });
  return (
    <button
      type={type}
      {...handlers}
      css={ButtonContainer(bgColor, size, isPressing)}
    >
      {label}
    </button>
  );
};

export default Button;

const BASE_COLOR_MAP = {
  gray: {
    default: color.GrayScale.gray3,
    hover: color.GrayScale.gray2,
    press: color.GrayScale.gray3,
  },
  orange: {
    default: color.Maincolor.primary,
    hover: color.SemanticScale.orange[500],
    press: color.SemanticScale.orange[600],
  },
};

const ButtonContainer = (
  bgColor: Color,
  size: Size,
  isPressing: boolean,
) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${isPressing
    ? BASE_COLOR_MAP[bgColor].press
    : BASE_COLOR_MAP[bgColor].default};
  width: 100%;
  height: ${size === "small" ? "52px" : "68px"};
  padding: ${size === "small" ? "20px 24px" : "16px 29px"};
  font: ${size === "small"
    ? typography.Label.l4_semi
    : typography.Body.b2_semi};
  color: ${color.GrayScale.white};
  cursor: pointer;
  transition: all 0.2s ease;

  ${!isPressing &&
  css`
    &:hover {
      background-color: ${BASE_COLOR_MAP[bgColor].hover};
    }
  `}
`;
