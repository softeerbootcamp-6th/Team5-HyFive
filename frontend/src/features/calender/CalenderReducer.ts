import { getWeekRange } from "./Calender.util";

interface CalenderState {
  calendarDate: Date; // 렌더링되는 기준 날짜
  selectedDate: Date | null; // 현재 선택된 날짜
  selectedWeek: Date[]; // 현재 선택된 날짜가 포함된 주
}

type CalenderAction =
  | { type: "SELECT_DATE"; payload: Date }
  | { type: "CHANGE_MONTH"; payload: Date; direction: "next" | "prev" }
  | { type: "SET_SELECTED_WEEK"; payload: Date };

const initialState: CalenderState = {
  selectedDate: new Date(),
  calendarDate: new Date(),
  selectedWeek: getWeekRange(new Date()),
};

const calenderReducer = (
  state: CalenderState,
  action: CalenderAction,
): CalenderState => {
  switch (action.type) {
    case "SELECT_DATE": {
      const clickedDate = action.payload;
      const newState = { ...state, selectedDate: clickedDate };

      // 주 설정
      newState.selectedWeek = getWeekRange(clickedDate);

      // 다른 월이면 월 변경
      if (
        clickedDate.getMonth() !== state.calendarDate.getMonth() ||
        clickedDate.getFullYear() !== state.calendarDate.getFullYear()
      ) {
        newState.calendarDate = new Date(
          clickedDate.getFullYear(),
          clickedDate.getMonth(),
          1,
        );
      }

      return newState;
    }
    case "CHANGE_MONTH": {
      const newDate = new Date(state.calendarDate);
      newDate.setDate(1);
      newDate.setMonth(
        state.calendarDate.getMonth() + (action.direction === "next" ? 1 : -1),
      );
      return {
        ...state,
        calendarDate: newDate,
      };
    }
    case "SET_SELECTED_WEEK": {
      return {
        ...state,
        selectedWeek: getWeekRange(action.payload),
      };
    }

    default:
      return state;
  }
};

export {
  initialState,
  calenderReducer,
  type CalenderState,
  type CalenderAction,
};
