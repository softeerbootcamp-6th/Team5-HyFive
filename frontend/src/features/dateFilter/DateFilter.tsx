import type { DateFilterValue } from "@/features/dateFilter/DateFilter.constants";
import Chip from "@/components/Chip";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { CalenderIcon } from "@/assets/icons";

const { color, typography } = theme;
interface DateFilterProps {
  value: DateFilterValue;
  options: { value: DateFilterValue; label: string }[];
  setValue: (value: DateFilterValue) => void;
}

const DateFilter = ({ value, options, setValue }: DateFilterProps) => {
  return (
    <div css={ContainerStyle}>
      <div css={RadioGroupStyle}>
        {options.map((option) => (
          <Chip
            key={option.value}
            chipType="fill"
            isActive={value === option.value}
            content={option.label}
            onClick={() => setValue(option.value)}
          />
        ))}
      </div>
      <div css={DateDisplayStyle}>
        <CalenderIcon fill={color.GrayScale.gray4} />
        <p css={DateTextStyle}>2025.08.17</p>
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
  font: ${typography.Body.b2_medi};
  color: ${color.GrayScale.gray4};
`;
