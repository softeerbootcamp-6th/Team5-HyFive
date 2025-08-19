import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

import { GrayInfoIcon } from "@/assets/icons";
import Button from "@/components/Button";

const { color, typography, borderRadius } = theme;

interface CarModalContentProps {
  type: "edit" | "delete";
  onClose?: () => void;
  onConfirm?: () => void;
}

const MODAL_TYPE_META = {
  edit: {
    title: "수정",
    content: "차량 등록화면으로 이동합니다.",
  },
  delete: {
    title: "삭제",
    content: "차량에 대한 기록이 모두 지워집니다.",
  },
};

const CarModalContent = ({
  type,
  onClose,
  onConfirm,
}: CarModalContentProps) => {
  const { title, content } = MODAL_TYPE_META[type];
  return (
    <div css={CardContainer}>
      <GrayInfoIcon />
      <div css={TextSection}>
        <h3 css={HeaderText}>
          차량을 <span css={HighlightedText}>{title}</span>하시겠습니까?
        </h3>
        <p css={ContentText}>{content}</p>
      </div>
      <div css={ButtonSection}>
        <Button
          label="취소"
          bgColor="gray"
          textColor="black"
          onClick={onClose}
        />
        <Button label={title} bgColor="orange" onClick={onConfirm} />
      </div>
    </div>
  );
};

export default CarModalContent;

const CardContainer = css`
  display: flex;
  background-color: ${color.GrayScale.white};
  width: 346px;
  align-items: center;
  justify-content: center;
  padding: 28px;
  border-radius: ${borderRadius.Medium};
  flex-direction: column;
  gap: 38px;
`;

const TextSection = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const HeaderText = css`
  font: ${typography.Heading.h3_semi};
  color: ${color.GrayScale.black};
`;

const HighlightedText = css`
  font: ${typography.Heading.h3_semi};
  color: ${color.Maincolor.primary};
`;
const ContentText = css`
  font: ${typography.Body.b4_medi};
  color: ${color.GrayScale.gray4};
`;

const ButtonSection = css`
  display: flex;
  width: 100%;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
`;
