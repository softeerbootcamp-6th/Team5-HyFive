import { useGetPassenger } from "@/apis/ScheduleAPI";
import { ChevronDownIcon } from "@/assets/icons";
import Table from "@/components/table/Table";
import { theme } from "@/styles/themes.style";
import { CustomError } from "@/utils/CustomError";
import { css } from "@emotion/react";
import { useState } from "react";
import { createPortal } from "react-dom";
const { color, typography } = theme;

const PassengerDropDown = ({ id }: { id: number | undefined }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { data, isError } = useGetPassenger(id as number);
  if (isError)
    throw new CustomError({
      message: "탑승자 정보 불러오는 과정에 문제가 존재합니다",
    });

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
            <Table rows={data ?? []} />
          </div>,
          document.getElementById("map")!,
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
  transition: transform 0.4s ease;
`;

const DropDownContent = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  padding: 0 40px 60px 42px;
  background-color: ${color.GrayScale.white};
  overflow-y: scroll;
`;
