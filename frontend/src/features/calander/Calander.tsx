import CalanderHeader from "@/features/calander/CalanderHeader";
import CalanderContent from "@/features/calander/CalanderContent";
import { useState } from "react";
import { CalanderContainer } from "@/features/calander/Calander.style";

const Calander = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // TODO: Reducer로 들어갈 상태

  const handlePrevBtn = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentDate(prevMonth);
  };
  const handleNextBtn = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const handleClickDate = (date: Date) => {
    setCurrentDate(date);
    setSelectedDate(date); // TODO: reducer로 옮기면 상태 변경 로직도 변경
  };

  return (
    <div css={CalanderContainer}>
      <CalanderHeader
        date={currentDate}
        onClickNext={handleNextBtn}
        onClickPrev={handlePrevBtn}
      />
      <CalanderContent
        date={currentDate}
        selectedDate={selectedDate}
        handleClickDate={handleClickDate}
      />
    </div>
  );
};

export default Calander;
