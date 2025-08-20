import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

const { color, typography, borderRadius } = theme;

export const AddrInputContainer = css`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
`;

export const InputSection = css`
  display: flex;
  gap: 8px;
`;

export const DropdownContainer = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100%;
  margin-top: 12px;
  background-color: ${color.GrayScale.white};
  width: 100%;
  height: 446px;
  border: 1px solid ${color.GrayScale.gray3};
  border-radius: ${borderRadius.Large};
  overflow: hidden;
  z-index: 10;
`;

export const DropdownHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid ${color.GrayScale.gray3};
`;

export const HeaderStyle = css`
  font: ${typography.Body.b1_medi};
  color: ${color.GrayScale.gray4};
`;

export const DropdownContentList = css`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export const DropdownContent = css`
  display: flex;
  padding: 20px;
  gap: 12px;
  border-bottom: 1px solid ${color.GrayScale.gray2};
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  text-align: left;
  &:hover {
    background-color: ${color.GrayScale.gray1};
    cursor: pointer;
  }
`;

export const DropdownText = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const DropdownTextName = css`
  font: ${typography.Body.b1_medi};
  color: ${color.GrayScale.black};
`;

export const DropdownTextAddr = css`
  font: ${typography.Body.b3_regu};
  color: ${color.GrayScale.gray5};
`;

export const CloseButtonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
