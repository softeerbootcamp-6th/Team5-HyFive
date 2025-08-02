import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
const { color } = theme;

type ChipType = "stroke" | "fill";
interface ChipProps {
  chipType: "stroke" | "fill";
  isActive: boolean;
  content: string;
}
const Chip = ({ chipType, isActive, content }: ChipProps) => {
  return <div css={ChipContainer(chipType, isActive)}>{content}</div>;
};

export default Chip;

const chipStyleMap = {
  stroke: {
    true: {
      borderColor: color.Maincolor.primary,
      fontColor: color.Maincolor.primary,
      backgroundColor: color.SemanticScale.orange[50],
    },
    false: {
      borderColor: "transparent",
      fontColor: color.GrayScale.gray4,
      backgroundColor: "transparent",
    },
  },
  fill: {
    true: {
      borderColor: color.Maincolor.primary,
      fontColor: color.GrayScale.black,
      backgroundColor: color.GrayScale.gray2,
    },
    false: {
      borderColor: color.GrayScale.gray3,
      fontColor: color.GrayScale.gray4,
      backgroundColor: "transparent",
    },
  },
} as const;

const getChipStyles = (chipType: ChipType, isActive: boolean) => {
  return chipStyleMap[chipType][isActive.toString() as "true" | "false"];
};

const ChipContainer = (chipType: ChipType, isActive: boolean) => {
  const { borderColor, fontColor, backgroundColor } = getChipStyles(
    chipType,
    isActive,
  );
  return css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 12px 16px;
    border-radius: 22px;
    border: ${chipType === "stroke" ? `1px solid ${borderColor}` : "none"};
    background-color: ${backgroundColor};
    color: ${fontColor};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${color.GrayScale.gray1};
    }
  `;
};
