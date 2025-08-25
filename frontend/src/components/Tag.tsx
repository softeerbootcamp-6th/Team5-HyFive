import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

const { color, typography } = theme;

const TAG_TYPES = [
  "orange",
  "red",
  "blue",
  "green",
  "gray",
  "selectedGray",
] as const;

type TagType = (typeof TAG_TYPES)[number];

interface TagProps {
  type: TagType;
  label: string;
}

const Tag = ({ type, label }: TagProps) => {
  return <div css={TagStyleCSS(type)}>{label}</div>;
};

// TODO: 색상 토큰화 필요
const getTagStyle = (type: TagType) => {
  switch (type) {
    case "orange":
      return {
        background: "rgba(255, 119, 0, 0.10)",
        color: color.Maincolor.primary,
      };

    case "red":
      return {
        background: "rgba(241, 66, 81, 0.10)",
        color: color.Semantic.error,
      };
    case "blue":
      return {
        background: "rgba(51, 111, 250, 0.10)",
        color: color.Semantic.success,
      };
    case "green":
      return {
        background: "rgba(24, 191, 129, 0.10)",
        color: color.Semantic.information,
      };
    case "gray":
      return {
        background: "rgba(97, 97, 97, 0.10)",
        color: color.GrayScale.gray5,
      };
    case "selectedGray":
      return {
        background: color.GrayScale.gray5,
        color: color.GrayScale.gray3,
      };
    default: {
      // TagType 확장 시 case 누락 방지 위함
      const _exhaustiveCheck: never = type;
      return _exhaustiveCheck;
    }
  }
};

export default Tag;

const TagStyleCSS = (type: TagType) => {
  const { background, color } = getTagStyle(type);
  return css`
    display: inline-flex;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    font: ${typography.Body.b4_medi};
    background-color: ${background};
    color: ${color};
  `;
};
