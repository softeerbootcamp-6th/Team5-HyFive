import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

const { color, typography, borderRadius } = theme;

interface MonoButtonProps {
  mode: "black" | "white";
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

const MonoButton = ({ mode, label, icon, onClick }: MonoButtonProps) => {
  return (
    <button css={[getButtonColor(mode), ButtonContainer]} onClick={onClick}>
      {icon}
      {label}
    </button>
  );
};

export default MonoButton;

const getButtonColor = (mode: "black" | "white") => {
  switch (mode) {
    case "black":
      return css`
        background-color: ${color.GrayScale.black};
        color: ${color.GrayScale.white};
      `;
    case "white":
      return css`
        background-color: ${color.GrayScale.white};
        color: ${color.GrayScale.black};
        border: 1px solid ${color.GrayScale.gray3};
      `;
  }
};
const ButtonContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  font: ${typography.Label.l3_semi};
  border-radius: ${borderRadius.Small};
  cursor: pointer;
`;
