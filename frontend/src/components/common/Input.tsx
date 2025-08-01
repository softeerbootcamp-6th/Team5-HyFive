import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { useState } from "react";

interface InputProps {
  type: string;
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  placeholder?: string;
  error?: string;
}

const Input = ({
  type,
  label,
  required = false,
  icon,
  placeholder,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div css={InputContainer}>
      <div css={LabelContainer}>
        <label css={InputLabel}>{label}</label>
        {required && <span css={RequiredStar}>*</span>}
      </div>
      <div css={InputWrapper}>
        <input
          css={StyledInput(isFocused)}
          type={type}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {icon && <span css={IconWrapper}>{icon}</span>}
      </div>
    </div>
  );
};

export default Input;

const InputContainer = css`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const LabelContainer = css`
  display: flex;
  gap: 4px;
`;

const InputLabel = css`
  font: ${theme.typography.Heading.h5_semi};
  color: ${theme.color.GrayScale.gray4};
`;

const RequiredStar = css`
  font: ${theme.typography.Heading.h5_semi};
  color: ${theme.color.Maincolor.primary};
`;

const InputWrapper = css`
  display: flex;
  position: relative;
`;

const IconWrapper = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  transform: translateY(-50%);
  right: 24px;
`;

const StyledInput = (isFocused: boolean) => css`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 60px;
  padding: 16px 48px 16px 24px;
  font: ${theme.typography.Body.b3_regu};
  color: ${theme.color.GrayScale.black};
  border: 1px solid
    ${isFocused ? theme.color.Maincolor.primary : theme.color.GrayScale.gray3};
  border-radius: ${theme.borderRadius.Medium};

  &::placeholder {
    color: ${theme.color.GrayScale.gray4};
  }
`;
