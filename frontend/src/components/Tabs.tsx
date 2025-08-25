import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { useState, useRef, useEffect } from "react";

type TabsType = "bar_true" | "bar_false";

interface TabsProps<T extends string> {
  type: TabsType;
  group: T[];
  selected: T;
  setSelected: (value: T) => void;
}

const { color, typography } = theme;

const Tabs = <T extends string>({
  type,
  group,
  selected,
  setSelected,
}: TabsProps<T>) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const selectedIndex = group.findIndex((item) => item === selected);

  useEffect(() => {
    const el = tabRefs.current[selectedIndex];
    if (el) {
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [selectedIndex]);
  return (
    <div css={TabsWrapper}>
      <div css={TabsContainer}>
        {group.map((item, i) => (
          <div
            data-testid="tab"
            key={item}
            css={StyledTab(type, selected === item)}
            onClick={() => setSelected(item)}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
          >
            {item}
          </div>
        ))}
        {type === "bar_true" && (
          <div css={Underline(indicatorStyle.left, indicatorStyle.width)} />
        )}
      </div>
    </div>
  );
};

export default Tabs;

const getTabFontColor = (type: TabsType, isActive: boolean) => {
  if (type === "bar_true") {
    return isActive ? color.GrayScale.black : color.GrayScale.gray4;
  }
  // bar_false
  return isActive ? color.GrayScale.white : color.GrayScale.gray4;
};

const getTabHoverColor = (type: TabsType) => {
  if (type === "bar_true") {
    return color.GrayScale.gray5;
  }
  // bar_false
  return color.GrayScale.gray3;
};

const TabsWrapper = css`
  position: relative;
`;

const TabsContainer = css`
  display: flex;
  gap: 40px;
`;

const StyledTab = (type: TabsType, isActive: boolean) => css`
  display: flex;
  padding: 24px 0 22px 0;
  align-items: center;
  justify-content: center;
  font: ${typography.Label.l3_semi};
  color: ${getTabFontColor(type, isActive)};
  cursor: pointer;

  &:hover {
    color: ${getTabHoverColor(type)};
  }
`;

const Underline = (left: number, width: number) => css`
  position: absolute;
  bottom: 0;
  height: 4px;
  background-color: ${color.GrayScale.black};
  left: ${left}px;
  width: ${width}px;
  transition:
    left 0.3s ease,
    width 0.3s ease;
`;
