import { ToolTipArrowIcon, WhiteEditIcon } from "@/assets/icons";
import MonoButton from "@/components/MonoButton";
import {
  ArrowStyle,
  TableActionButtonGroupStyle,
  ToolTipBoxStyle,
} from "@/features/timeTable/TimeTable.style";

interface ActionButtonGroupProps {
  isEditableWeek: boolean;
  isEditMode: boolean;
  onEditModeChange: (isEditMode: boolean) => void;
  onCancelClick: () => void;
  onSaveClick: () => void;
}

const ActionButtonGroup = ({
  isEditableWeek,
  isEditMode,
  onEditModeChange,
  onCancelClick,
  onSaveClick,
}: ActionButtonGroupProps) => {
  if (!isEditableWeek)
    return (
      <div css={TableActionButtonGroupStyle}>
        <MonoButton
          mode="gray"
          label="유휴시간 편집"
          icon={<WhiteEditIcon />}
          onClick={() => {}}
        />
        <div css={ToolTipBoxStyle}>
          2주 이후부터 유휴시간 등록이 가능합니다.
          <ToolTipArrowIcon css={ArrowStyle} />
        </div>
      </div>
    );
  return (
    <div css={TableActionButtonGroupStyle}>
      {isEditMode ? (
        <>
          <MonoButton mode="white" label="취소" onClick={onCancelClick} />
          <MonoButton mode="black" label="저장" onClick={onSaveClick} />
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
