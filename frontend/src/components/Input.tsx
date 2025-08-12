import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

const { color, typography, borderRadius } = theme;

interface InputProps {
  label: string;
  required?: boolean;
  requiredLabel?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
  onClick?: () => void;
  register?: UseFormRegisterReturn;
  errorMessage?: string;
}

const Input = ({
  label,
  required = false,
  requiredLabel = "",
  icon,
  placeholder,
  value,
  readOnly = false,
  onClick,
  register,
  errorMessage = "",
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div css={InputContainer}>
      <div css={LabelContainer}>
        <label css={InputLabel}>{label}</label>
        {required && (
          <>
            <span css={RequiredStar}>*</span>
            <span css={RequiredLabel}>{requiredLabel}</span>
          </>
        )}
      </div>
      <div css={InputWrapper}>
        <input
          css={StyledInput(isFocused, readOnly, errorMessage)}
          type="text"
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          readOnly={readOnly}
          onClick={onClick}
          value={value}
          {...register}
        />
        {icon && <span css={IconWrapper}>{icon}</span>}
      </div>
      {errorMessage && <p css={ErrorText}>{errorMessage}</p>}
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
  align-items: center;
`;

const InputLabel = css`
  font: ${typography.Heading.h5_semi};
  color: ${color.GrayScale.gray4};
`;

const RequiredStar = css`
  font: ${typography.Heading.h5_semi};
  color: ${color.Maincolor.primary};
`;

const RequiredLabel = css`
  font: ${typography.Label.l5_semi};
  color: ${color.Maincolor.primary};
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

const ErrorText = css`
  font: ${typography.Body.b4_regu};
  color: ${color.Semantic.error};
`;

const StyledInput = (
  isFocused: boolean,
  readOnly: boolean,
  errorMessage: string,
) => css`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 60px;
  padding: 16px 48px 16px 24px;
  font: ${typography.Body.b3_regu};
  color: ${color.GrayScale.black};
  border: 1px solid
    ${errorMessage
      ? color.Semantic.error
      : isFocused
        ? color.Maincolor.primary
        : color.GrayScale.gray3};
  border-radius: ${borderRadius.Medium};
  cursor: ${readOnly ? "pointer" : "text"};
  &::placeholder {
    color: ${color.GrayScale.gray4};
  }
`;
