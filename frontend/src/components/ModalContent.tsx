import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import Button from "@/components/Button";

const { color, typography, borderRadius } = theme;

interface ModalContentProps {
  content: string;
  onClose: () => void;
}

const ModalContent = ({ content, onClose }: ModalContentProps) => {
  return (
    <div css={CardContainer}>
      <h3 css={TextStyle}>{content}</h3>
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
  font: ${typography.Heading.h3_semi};
  color: ${color.GrayScale.black};
`;
