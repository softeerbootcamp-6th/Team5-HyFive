import type { Meridiem } from "@/features/timePicker/TimePicker.type";

import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

const { color, typography, borderRadius } = theme;

interface AMPMSelectorProps {
  selectedMeridiem: Meridiem;
  onClick: (meridiem: Meridiem) => void;
}

const AMPMSelector = ({ selectedMeridiem, onClick }: AMPMSelectorProps) => {
  return (
    <div css={AMPMSelectorStyle}>
      <button
        css={AMPMOptionStyle(selectedMeridiem === "AM")}
        onClick={() => onClick("AM")}
      >
        AM
      </button>
      <button
        css={AMPMOptionStyle(selectedMeridiem === "PM")}
        onClick={() => onClick("PM")}
        value="PM"
      >
        PM
      </button>
    </div>
  );
};

export default AMPMSelector;

const AMPMSelectorStyle = css`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 100%;
  border: 1px solid ${color.GrayScale.gray3};
  border-radius: ${borderRadius.Large};
  overflow: hidden;
`;

const AMPMOptionStyle = (isSelected: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 12px 20px;
  font: ${typography.Label.l2_semi};
  background-color: ${isSelected
    ? color.SemanticScale.orange[50]
    : color.GrayScale.white};
  color: ${isSelected ? color.Maincolor.primary : color.GrayScale.gray4};
  cursor: ${isSelected ? "default" : "pointer"};
`;
