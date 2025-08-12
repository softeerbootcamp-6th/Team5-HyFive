import { getTimeBlockGridStyle } from "@/features/timeTable/TimeTable.style";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { format } from "date-fns";

const { color, typography } = theme;

interface PreviewTimeSlotProps {
  startPosition: { dayIndex: number; hourIndex: number };
  endPosition: { dayIndex: number; hourIndex: number };
  selectedWeek: Date[];
}

const PreviewTimeSlot = ({
  startPosition,
  endPosition,
  selectedWeek,
}: PreviewTimeSlotProps) => {
  const mockSlot = {
    rentalDate: format(selectedWeek[startPosition.dayIndex], "yyyy-MM-dd"),
    rentalStartTime: `${9 + startPosition.hourIndex}:00`,
    rentalEndTime: `${9 + endPosition.hourIndex + 1}:00`,
  };

  return (
    <div
      css={[getTimeBlockGridStyle(mockSlot, selectedWeek), previewBlockStyle]}
    />
  );
};

const previewBlockStyle = css`
  border-radius: 0 10px 10px 0;
  margin: 8px;
  font: ${typography.Label.l4_semi};
  background: ${color.SemanticScale.orange[100]};
  border-left: 4px solid ${color.Maincolor.primary};
  color: ${color.Maincolor.primary};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none; /* 마우스 이벤트 차단 */
`;

export default PreviewTimeSlot;
