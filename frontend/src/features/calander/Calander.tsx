import CalanderHeader from "@/features/calander/CalanderHeader";
import CalanderContent from "@/features/calander/CalanderContent";
import { useState } from "react";
import { CalanderContainer } from "@/features/calander/Calander.style";

export type HighlightType = "day" | "week";

interface CalanderProps {
  highlightType?: HighlightType;
}
const Calander = ({ highlightType = "day" }: CalanderProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // TODO: Reducer로 들어갈 상태

  const changeMonth = (direction: "next" | "prev") => {
    const offset = direction === "next" ? 1 : -1;
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const handleClickDate = (date: Date) => {
    setCurrentDate(date);
    setSelectedDate(date); // TODO: reducer로 옮기면 상태 변경 로직도 변경
  };

  return (
    <div css={CalanderContainer}>
      <CalanderHeader
        date={currentDate}
        onClickPrev={() => changeMonth("prev")}
        onClickNext={() => changeMonth("next")}
      />
      <CalanderContent
        date={currentDate}
        highlightType={highlightType}
        selectedDate={selectedDate}
        handleClickDate={handleClickDate}
      />
    </div>
  );
};

export default Calander;
