import type { DateFilterValue } from "@/features/dateFilter/DateFilter.constants";
import Chip from "@/components/Chip";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { CalenderIcon } from "@/assets/icons";
import { useMemo } from "react";
import {
  formatDateForDisplay,
  getFilterDate,
} from "@/features/dateFilter/DateFilter.util";

const { color, typography } = theme;
interface DateFilterProps {
  value: DateFilterValue;
  options: { value: DateFilterValue; label: string }[];
  setValue: (value: DateFilterValue) => void;
  now?: Date;
}

const DateFilter = ({
  value,
  options,
  setValue,
  now = new Date(),
}: DateFilterProps) => {
  const displayText = useMemo(() => {
    const refDay = getFilterDate(value, now);
    return formatDateForDisplay(value, refDay);
  }, [value, now]);

  const handleButtonClick = (value: DateFilterValue) => {
    setValue(value);
  };

  return (
    <div css={ContainerStyle}>
      <div css={RadioGroupStyle}>
        {options.map((option) => (
          <Chip
            key={option.value}
            chipType="fill"
            isActive={value === option.value}
            content={option.label}
            onClick={() => handleButtonClick(option.value)}
          />
        ))}
      </div>
      <div css={DateDisplayStyle}>
        <CalenderIcon fill={color.GrayScale.gray4} />
        <p css={DateTextStyle}>{displayText}</p>
      </div>
    </div>
  );
};

export default DateFilter;

const ContainerStyle = css`
  display: flex;
  gap: 20px;
`;

const RadioGroupStyle = css`
  display: flex;
  gap: 12px;
`;

const DateDisplayStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const DateTextStyle = css`
  min-width: 108px;
  font: ${typography.Body.b2_medi};
  color: ${color.GrayScale.gray4};
`;
