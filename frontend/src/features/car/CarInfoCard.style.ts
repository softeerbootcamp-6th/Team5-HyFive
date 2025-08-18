import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

const { color, typography, borderRadius } = theme;

const getCardBackgroundColor = (isSelected: boolean, isPressing: boolean) => {
  if (isSelected) return color.GrayScale.black;
  if (isPressing) return color.GrayScale.gray3;
  return color.GrayScale.white;
};

const CardContainer = (isSelected: boolean, isPressing: boolean) => css`
  display: flex;
  width: 290px;
  height: 316px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  background-color: ${getCardBackgroundColor(isSelected, isPressing)};
  border-radius: ${borderRadius.Large};
  border: 1px solid ${color.GrayScale.gray3};
  cursor: pointer;
  ${!isSelected &&
  !isPressing &&
  css`
    &:hover {
      background-color: ${color.GrayScale.gray1};
    }
  `}
`;

const ImgSection = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 153px;
  border-radius: ${borderRadius.Medium};

  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ContentSection = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;

const ContentHeader = css`
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

const NumLabel = (isSelected: boolean) => css`
  font: ${typography.Body.b2_semi};
  color: ${isSelected ? color.GrayScale.white : color.GrayScale.black};
`;

const NameLabel = css`
  font: ${typography.Body.b3_medi};
  color: ${color.GrayScale.gray4};
`;

const TagSection = css`
  display: flex;
  gap: 8px;
`;

const CarTag = (isSelected: boolean) => css`
  display: flex;
  height: 28px;
  padding: 2px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${isSelected
    ? color.GrayScale.gray5
    : color.GrayScale.gray1};
  color: ${isSelected ? color.GrayScale.gray3 : color.GrayScale.gray4};
  border-radius: ${borderRadius.Small};
  font: ${typography.Body.b4_medi};
`;

export {
  CardContainer,
  ImgSection,
  ContentSection,
  ContentHeader,
  NumLabel,
  NameLabel,
  TagSection,
  CarTag,
};
