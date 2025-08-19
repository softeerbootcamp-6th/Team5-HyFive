import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { useState } from "react";
import type { Meridiem } from "@/features/timePicker/TimePicker.type";
import AMPMSelector from "@/features/timePicker/AMPMSelector";

const { color, typography, borderRadius } = theme;

interface TimePickerProps {
  onCancel: () => void;
  onConfirm: (time: string) => void;
}

const TimePicker = ({ onCancel, onConfirm }: TimePickerProps) => {
  const [selectedMeridiem, setSelectedMeridiem] = useState<Meridiem>("AM");

  return (
    <div css={TimePickerContainer}>
      <h3 css={TitleStyle}>시간을 입력해주세요.</h3>
      <div css={InputSection}>
        <input css={InputBoxStyle} placeholder="00" maxLength={2}></input>
        <span
          css={{
            font: typography.Heading.h1_semi,
            color: color.GrayScale.black,
          }}
        >
          :
        </span>
        <input css={InputBoxStyle} placeholder="00"></input>
        <AMPMSelector
          selectedMeridiem={selectedMeridiem}
          onClick={setSelectedMeridiem}
        />
      </div>
      <div css={ButtonSection}>
        <button css={ButtonStyle("cancel")} onClick={onCancel}>
          취소
        </button>
        <button css={ButtonStyle("confirm")} onClick={() => onConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default TimePicker;

const TimePickerContainer = css`
  display: flex;
  width: 461px;
  flex-direction: column;
  gap: 36px;
  padding-top: 40px;
  border: 1px solid ${color.GrayScale.gray3};
  border-radius: ${borderRadius.Large};
  background-color: ${color.GrayScale.white};
`;

const TitleStyle = css`
  padding-left: 40px;
  padding-right: 40px;
  font: ${typography.Body.b1_medi};
  color: ${color.GrayScale.gray6};
`;

const InputSection = css`
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  gap: 19px;
  align-items: center;
  justify-content: center;
`;

const InputBoxStyle = css`
  display: flex;
  width: 50px;
  padding: 24px 36px;
  align-items: center;
  justify-content: center;
  font: ${typography.Heading.h1_semi};
  color: ${color.GrayScale.black};
  border-radius: ${borderRadius.Large};
  border: 2px solid ${color.GrayScale.gray1};
  background-color: ${color.GrayScale.gray1};
  text-align: right;

  &::placeholder {
    color: ${color.GrayScale.black};
  }
  &:focus::placeholder {
    color: transparent;
  }
  &:focus {
    outline: none;
    background-color: ${color.GrayScale.white};
    border: 2px solid ${color.Maincolor.primary};
    caret-color: ${color.Maincolor.primary};
  }
`;

const ButtonSection = css`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: end;
`;

const ButtonStyle = (type: "cancel" | "confirm") => css`
  padding: 24px 32px;
  background-color: transparent;
  cursor: pointer;
  font: ${typography.Label.l2_semi};
  color: ${type === "cancel" ? color.GrayScale.gray4 : color.Semantic.success};
`;
