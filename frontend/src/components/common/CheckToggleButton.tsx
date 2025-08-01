import { CheckCircleIcon, ActiveCheckCircleIcon } from "@/assets/icons";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

const { color, typography, borderRadius } = theme;

interface CheckToggleButtonProps {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
}

const CheckToggleButton = ({
  label,
  isChecked,
  onToggle,
}: CheckToggleButtonProps) => {
  return (
    <button css={ButtonContainer(isChecked)} onClick={onToggle}>
      <p css={StyledLabel(isChecked)}>{label}</p>
      {isChecked ? (
        <ActiveCheckCircleIcon />
      ) : (
        <CheckCircleIcon
          fill={color.GrayScale.white}
          stroke={color.GrayScale.gray4}
        />
      )}
    </button>
  );
};

export default CheckToggleButton;

const ButtonContainer = (isChecked: boolean) => css`
  border: 1px solid
    ${isChecked ? color.Maincolor.primary : color.GrayScale.gray3};
  border-radius: ${borderRadius.Medium};
  background-color: ${isChecked
    ? color.SemanticScale.orange[50]
    : color.GrayScale.white};
  display: flex;
  justify-content: space-between;
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
