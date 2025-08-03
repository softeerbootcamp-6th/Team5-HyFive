import useLongPress from "@/hooks/useLongPress";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
import { useState } from "react";
const { color } = theme;

type ChipType = "stroke" | "fill";
interface ChipProps {
  chipType: "stroke" | "fill";
  isActive: boolean;
  content: string;
}
const Chip = ({ chipType, isActive, content }: ChipProps) => {
  const [isPressing, setIsPressing] = useState(false);
  const handlers = useLongPress({
    handleLongPress: () => {},
    handleShortPress: () => {},
    setIsPressing,
  });
  return (
    <div {...handlers} css={ChipContainer(chipType, isActive, isPressing)}>
      {content}
    </div>
  );
};

export default Chip;

const BASE_COLOR_MAP = {
  stroke: {
    default: {
      border: color.GrayScale.gray3,
      font: color.GrayScale.gray4,
      bg: "transparent",
    },
    active: {
      border: color.Maincolor.primary,
      font: color.Maincolor.primary,
      bg: color.SemanticScale.orange[50],
    },
  },
  fill: {
    default: {
      border: "transparent",
      font: color.GrayScale.gray4,
      bg: "transparent",
    },
    active: {
      border: "transparent",
      font: color.GrayScale.black,
      bg: color.GrayScale.gray2,
    },
  },
} as const;

const PRESSING_COLOR_MAP = {
  border: "transparent",
  font: color.GrayScale.gray4,
  bg: color.GrayScale.gray3,
};

const getCurrentColor = (
  chipType: ChipType,
  isActive: boolean,
  isPressing: boolean,
) => {
  if (isPressing) return PRESSING_COLOR_MAP;
  return isActive
    ? BASE_COLOR_MAP[chipType].active
    : BASE_COLOR_MAP[chipType].default;
};

const ChipContainer = (
  chipType: ChipType,
  isActive: boolean,
  isPressing: boolean,
) => {
  const { border, font, bg } = getCurrentColor(chipType, isActive, isPressing);
  return css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 12px 16px;
    border-radius: 22px;
    border: 1px solid ${border};
    background-color: ${bg};
    color: ${font};
    cursor: pointer;
    transition: all 0.2s ease;

    ${!isActive &&
    !isPressing &&
    css`
      &:hover {
        background-color: ${color.GrayScale.gray1};
      }
    `}
  `;
};
