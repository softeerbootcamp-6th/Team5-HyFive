import Chip from "@/components/Chip";
import type { UserFilterValue } from "@/features/statusFilter/StatusFilter.constants";
import { css } from "@emotion/react";

interface StatusFilterProps {
  value: UserFilterValue;
  options: { value: UserFilterValue; label: string }[];
  setValue: (value: UserFilterValue) => void;
}

const StatusFilter = ({ value, options, setValue }: StatusFilterProps) => {
  return (
    <div css={RadioGroupStyle}>
      {options.map((option) => (
        <Chip
          key={option.value}
          chipType="stroke"
          isActive={option.value === value}
          content={option.label}
          onClick={() => setValue(option.value)}
        />
      ))}
    </div>
  );
};

export default StatusFilter;

const RadioGroupStyle = css`
  display: flex;
  gap: 12px;
`;
