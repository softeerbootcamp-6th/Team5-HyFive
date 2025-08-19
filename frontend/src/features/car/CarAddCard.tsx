import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { useState } from "react";
import usePressDetection from "@/hooks/usePressDetection";
import { AddIcon } from "@/assets/icons";

const { color, typography, borderRadius } = theme;

interface CarAddCardProps {
  onClick: () => void;
}

const CarAddCard = ({ onClick }: CarAddCardProps) => {
  const [isPressing, setIsPressing] = useState(false);

  const pressHandlers = usePressDetection({
    setIsPressing,
  });

  return (
    <div
      onClick={onClick}
      {...pressHandlers}
      css={AddCardContainer(isPressing)}
    >
      <div css={IconSection}>
        <AddIcon fill={color.GrayScale.white} />
      </div>
      <h6 css={AddTitleStyle}>차량 추가하기</h6>
    </div>
  );
};

export default CarAddCard;

const AddCardContainer = (isPressing: boolean) => css`
  display: flex;
  height: 316px;
  padding: 125px 96px;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${borderRadius.Large};
  border: 1px solid ${color.GrayScale.gray3};
  cursor: pointer;

  ${!isPressing &&
  css`
    &:hover {
      background-color: ${color.GrayScale.gray1};
    }
  `}
`;

const IconSection = css`
  display: flex;
  padding: 2px;
  align-items: center;
  gap: 10px;
  border-radius: 14px;
  background-color: ${color.GrayScale.black};
`;

const AddTitleStyle = css`
  font: ${typography.Label.l3_semi};
  color: ${color.GrayScale.gray4};
`;
