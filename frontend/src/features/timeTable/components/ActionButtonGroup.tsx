import { WhiteEditIcon } from "@/assets/icons";
import MonoButton from "@/components/MonoButton";
import { TableActionButtonGroupStyle } from "@/features/timeTable/TimeTable.style";

interface ActionButtonGroupProps {
  isEditableWeek: boolean;
  isEditMode: boolean;
  onEditModeChange: (isEditMode: boolean) => void;
}

const ActionButtonGroup = ({
  isEditableWeek,
  isEditMode,
  onEditModeChange,
}: ActionButtonGroupProps) => {
  if (!isEditableWeek) return null;
  return (
    <div css={TableActionButtonGroupStyle}>
      {isEditMode ? (
        <>
          <MonoButton
            mode="white"
            label="취소"
            onClick={() => onEditModeChange(false)}
          />
          <MonoButton
            mode="black"
            label="저장"
            onClick={() => onEditModeChange(false)}
          />
        </>
      ) : (
        <MonoButton
          mode="black"
          label="유휴시간 편집"
          icon={<WhiteEditIcon />}
          onClick={() => onEditModeChange(true)}
        />
      )}
    </div>
  );
};

export default ActionButtonGroup;
