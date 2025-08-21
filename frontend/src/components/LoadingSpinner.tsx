import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { rotating } from "@/utils/RotateAnimation";

const { color } = theme;

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

const LoadingSpinner = ({
  size = "medium",
  color: spinnerColor = color.Maincolor.primary,
}: LoadingSpinnerProps) => {
  return (
    <div css={SpinnerContainer(size)}>
      <div css={Spinner(size, spinnerColor)} />
    </div>
  );
};

export default LoadingSpinner;

// 컨테이너 스타일
const SpinnerContainer = (size: "small" | "medium" | "large") => css`
  display: flex;
  align-items: center;
  justify-content: center;
  ${getSizeStyles(size).container}
`;

// 스피너 스타일
const Spinner = (
  size: "small" | "medium" | "large",
  spinnerColor: string,
) => css`
  border: ${getSizeStyles(size).borderWidth} solid ${color.GrayScale.gray2};
  border-top: ${getSizeStyles(size).borderWidth} solid ${spinnerColor};
  border-radius: 50%;
  ${getSizeStyles(size).spinner}
  ${rotating(true)}
`;

// 크기별 스타일
const getSizeStyles = (size: "small" | "medium" | "large") => {
  const styles = {
    small: {
      container: css`
        width: 16px;
        height: 16px;
      `,
      spinner: css`
        width: 16px;
        height: 16px;
      `,
      borderWidth: "2px",
    },
    medium: {
      container: css`
        width: 24px;
        height: 24px;
      `,
      spinner: css`
        width: 24px;
        height: 24px;
      `,
      borderWidth: "3px",
    },
    large: {
      container: css`
        width: 32px;
        height: 32px;
      `,
      spinner: css`
        width: 32px;
        height: 32px;
      `,
      borderWidth: "4px",
    },
  };

  return styles[size];
};
