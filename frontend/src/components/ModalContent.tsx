import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import Button from "@/components/Button";

const { color, typography, borderRadius } = theme;

interface ModalContentProps {
  type?: string;
  content: string;
  onClose: () => void;
}

const ModalContent = ({ type, content, onClose }: ModalContentProps) => {
  return (
    <div css={CardContainer}>
      {type === "alert" ? (
        <p css={AlertTextStyle}>{content}</p>
      ) : (
        <h3 css={TextStyle}>{content}</h3>
      )}
      <Button label="확인" bgColor="orange" onClick={onClose} />
    </div>
  );
};

export default ModalContent;

const CardContainer = css`
  width: 346px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  background-color: ${color.GrayScale.white};
  align-items: center;
  justify-content: center;
  gap: 32px;
  border-radius: ${borderRadius.Medium};
`;

const TextStyle = css`
  font: ${typography.Heading.h5_semi};
  color: ${color.GrayScale.black};
`;

const AlertTextStyle = css`
  text-align: center;
  font: ${typography.Label.l3_semi};
  color: ${color.GrayScale.black};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 최대 줄 수 제한
  -webkit-box-orient: vertical;
  word-break: break-word; // 단어 단위로 줄바꿈
  overflow-wrap: break-word; // 긴 단어가 영역을 넘으면 줄바꿈
`;
