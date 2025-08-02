import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
const { color, typography } = theme;

type Color = "gray" | "orange";
type Size = "small" | "big";
interface ButtonProps {
  bgColor: Color;
  size: Size;
}

const Button = ({ bgColor, size }: ButtonProps) => {
  return <div css={ButtonContainer(bgColor, size)}>Button</div>;
};

export default Button;

const BackgroundColorMap = {
  gray: {
    default: color.GrayScale.gray3,
    hover: color.GrayScale.gray2,
  },
  orange: {
    default: color.Maincolor.primary,
    hover: color.SemanticScale.orange[500],
  },
};

const ButtonContainer = (bgColor: Color, size: Size) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${BackgroundColorMap[bgColor].default};
  width: 100%;
  height: ${size === "small" ? "52px" : "68px"};
  padding: ${size === "small" ? "20px 24px" : "16px 29px"};
  font: ${size === "small"
    ? typography.Label.l4_semi
    : typography.Body.b2_semi};
  color: ${color.GrayScale.white};

  &:hover {
    background-color: ${BackgroundColorMap[bgColor].hover};
  }
`;
