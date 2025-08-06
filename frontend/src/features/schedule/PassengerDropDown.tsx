import { ChevronDownIcon, ChevronUpIcon } from "@/assets/icons";
import Table from "@/components/table/Table";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
import { useState } from "react";
import { createPortal } from "react-dom";
const { color, typography } = theme;

const PassengerDropDown = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const sampleData = Array.from({ length: 12 }, (_, i) => ({
    order: i + 1,
    name: `김민정 ${i + 1}`,
    phone: `010-0000-000${i}`,
    isExistWalkingDevice: i % 2 === 0 ? "o" : "-",
    boardingTime: "12:00",
    getOffTime: "13:00",
  }));
  return (
    <>
      <div
        css={DropDownTrigger}
        onClick={() => setIsDropDownOpen((prev) => !prev)}
      >
        <p>탑승자 정보</p>
        <div css={ChevronWrapper(isDropDownOpen)}>
          <ChevronDownIcon />
        </div>
      </div>
      {isDropDownOpen &&
        createPortal(
          <div css={DropDownContent}>
            <Table rows={sampleData} />
          </div>,
          document.getElementById("map-content")!,
        )}
    </>
  );
};

export default PassengerDropDown;

const DropDownTrigger = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 14px;
  border-radius: 20px;
  border: 1px solid ${color.GrayScale.gray3};
  font: ${typography.Body.b2_medi};
  cursor: pointer;
  transition: transform 0.2s ease;
`;

const ChevronWrapper = (isDropDownOpen: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateX(${isDropDownOpen ? "180deg" : "0deg"});
  transition: transform 0.5s ease;
`;

const DropDownContent = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: ${color.GrayScale.white};
  overflow-y: scroll;
`;
