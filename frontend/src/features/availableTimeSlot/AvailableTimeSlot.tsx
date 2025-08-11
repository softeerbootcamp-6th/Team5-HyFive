import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import type { AvailableTimeSlotType } from "../TimeTable/TimeTable.type";
import { getTimeBlockGridStyle } from "../TimeTable/TimeTable.style";
import { isBefore, startOfDay } from "date-fns";

const { color, typography } = theme;

interface AvailableTimeSlotProps {
  block: AvailableTimeSlotType;
  selectedWeek: Date[];
}

const AvailableTimeSlot = ({ block, selectedWeek }: AvailableTimeSlotProps) => {
  // 블록 날짜가 오늘보다 이전인지 확인
  const blockDate = new Date(block.rentalDate);
  const today = startOfDay(new Date());
  const isPastDate = isBefore(blockDate, today);

  return (
    <div
      css={[
        getTimeBlockGridStyle(block, selectedWeek),
        getSlotContainerStyle(isPastDate),
      ]}
    >
      <header>유휴 시간</header>
      <time dateTime={`${block.rentalStartTime}/${block.rentalEndTime}`}>
        {block.rentalStartTime} ~ {block.rentalEndTime}
      </time>
    </div>
  );
};

export default AvailableTimeSlot;

// 기본 슬롯 스타일
const BaseSlotStyle = css`
  border-radius: 0 10px 10px 0;
  margin: 8px;
  padding: 20px;
  font: ${typography.Label.l4_semi};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// 현재/미래 날짜 스타일
const ActiveSlotStyle = css`
  background: ${color.SemanticScale.orange[100]};
  border-left: 4px solid ${color.Maincolor.primary};
  color: ${color.Maincolor.primary};
`;

// 과거 날짜 스타일
const PastSlotStyle = css`
  background: ${color.GrayScale.gray2};
  border-left: 4px solid ${color.GrayScale.gray4};
  color: ${color.GrayScale.gray4};
`;

// 수정 모드 스타일 (나중에 사용)
// const EditModeStyle = css`
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover {
//     transform: translateY(-1px);
//     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//   }
// `;

// 스타일 조합 함수
const getSlotContainerStyle = (isPastDate: boolean) => {
  const styles = [BaseSlotStyle];

  if (isPastDate) {
    styles.push(PastSlotStyle);
  } else {
    styles.push(ActiveSlotStyle);
  }

  // TODO: 수정모드일 때 EditModeStyle 추가
  // if (isEditMode) {
  //   styles.push(EditModeStyle);
  // }

  return styles;
};
