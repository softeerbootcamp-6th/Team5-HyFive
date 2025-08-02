import { CheckCircleIcon, ActiveCheckCircleIcon } from "@/assets/icons";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
const { color, typography, borderRadius } = theme;

type toggleButtonType = "check" | "radio";

interface ToggleButtonProps {
  type: toggleButtonType;
  label: string;
  isChecked: boolean;
  onToggle: () => void;
}

const ToggleButton = ({
  type,
  label,
  isChecked,
  onToggle,
}: ToggleButtonProps) => {
  return (
    <button css={ButtonContainer(type, isChecked)} onClick={onToggle}>
      <p css={StyledLabel(isChecked)}>{label}</p>
      {type === "check" &&
        (isChecked ? (
          <ActiveCheckCircleIcon />
        ) : (
          <CheckCircleIcon
            fill={color.GrayScale.white}
            stroke={color.GrayScale.gray4}
          />
        ))}
    </button>
  );
};

export default ToggleButton;

const ButtonContainer = (type: toggleButtonType, isChecked: boolean) => css`
  border: 1px solid
    ${isChecked ? color.Maincolor.primary : color.GrayScale.gray3};
  border-radius: ${borderRadius.Medium};
  background-color: ${isChecked
    ? color.SemanticScale.orange[50]
    : color.GrayScale.white};
  display: flex;
  justify-content: ${type === "check" ? "space-between" : "center"};
  flex: auto;
  padding: 16px 24px;
  cursor: pointer;

  &:hover {
    background-color: ${!isChecked
      ? color.GrayScale.gray1
      : color.SemanticScale.orange[50]};
  }
`;

const StyledLabel = (isChecked: boolean) => css`
  font: ${typography.Label.l3_semi};
  color: ${isChecked ? color.Maincolor.primary : color.GrayScale.gray4};
`;
