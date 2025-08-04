import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import ToggleButton from "@/components/common/ToggleButton";
// radio group 배열을 받아와 ToggleButton들을 하나의 상태로 관리

interface RadioGroupProps {
  label: string;
  group: string[];
  selected: string;
  setSelected: (value: string) => void;
}

const { color, typography } = theme;

const RadioGroup = ({
  label,
  group,
  selected,
  setSelected,
}: RadioGroupProps) => {
  return (
    <div css={RadioGroupContainer}>
      <label css={StyledLabel}>{label}</label>
      <div css={GroupWrapper}>
        {group.map((item) => (
          <ToggleButton
            key={item}
            type="radio"
            label={item}
            isChecked={selected === item}
            onToggle={() => setSelected(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;

const RadioGroupContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;
const StyledLabel = css`
  font: ${typography.Heading.h5_semi};
  color: ${color.GrayScale.gray4};
`;

const GroupWrapper = css`
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`;
