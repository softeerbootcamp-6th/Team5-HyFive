import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { InfoIcon, ToolTipArrowIcon } from "@/assets/icons";

const { color, typography, borderRadius } = theme;

interface ToolTipProps {
  label: string;
  content: string;
}

const ToolTip = ({ label, content }: ToolTipProps) => {
  return (
    <div css={ContainerStyle}>
      <span css={LabelStyle}>{label}</span>
      <div css={IconWrapperStyle}>
        <InfoIcon fill={color.GrayScale.gray4} />
        <div css={ToolTipBoxStyle}>
          {content}
          <ToolTipArrowIcon css={ArrowStyle} />
        </div>
      </div>
    </div>
  );
};

export default ToolTip;

const ContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const LabelStyle = css`
  font: ${typography.Label.l4_semi};
  color: ${color.GrayScale.gray4};
`;

const IconWrapperStyle = css`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover div {
    opacity: 1;
    pointer-events: auto;
  }
`;

const ToolTipBoxStyle = css`
  display: flex;
  width: max-content;
  position: absolute;
  padding: 12px 14px;
  bottom: 160%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
  white-space: pre-line;
  background-color: ${color.GrayScale.gray6};
  border-radius: ${borderRadius.Large};
  font: ${typography.Caption.c1_medi};
  line-height: 1.5;
  color: ${color.GrayScale.gray2};
`;

const ArrowStyle = css`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
`;
