import { CloseIcon, InfoIcon, LocationIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  DropdownContainer,
  DropdownHeader,
  HeaderStyle,
  CloseButtonStyle,
  DropdownContentList,
  DropdownContent,
  DropdownText,
  DropdownTextName,
  DropdownTextAddr,
  NoContentText,
  LoadingContent,
} from "./AddressInput.style";
import { useEffect, useRef } from "react";

const { color } = theme;

export interface AddressItem {
  id: string;
  name: string;
  addr: string;
}

interface AddressDropdownProps {
  type: "departure" | "destination";
  results: AddressItem[];
  isLoading?: boolean;
  error?: string | null;
  onItemSelect: (item: AddressItem) => void;
  onClose: () => void;
}

const AddressDropdown = ({
  type,
  results,
  isLoading = false,
  error = null,
  onItemSelect,
  onClose,
}: AddressDropdownProps) => {
  const headerText = type === "departure" ? "출발지 검색" : "도착지 검색";

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div css={DropdownContainer} ref={dropdownRef}>
      <header css={DropdownHeader}>
        <h3 css={HeaderStyle}>{headerText}</h3>
        <button onClick={onClose} css={CloseButtonStyle}>
          <CloseIcon fill={color.GrayScale.gray4} />
        </button>
      </header>
      <div css={DropdownContentList}>
        {isLoading ? (
          <div css={LoadingContent}>
            <LoadingSpinner size="small" />
            <p css={NoContentText}>잠시만 기다려주세요</p>
          </div>
        ) : error ? (
          <div css={DropdownContent}>
            <InfoIcon fill={color.GrayScale.gray4} />
            <p css={NoContentText}>{error}</p>
          </div>
        ) : results.length > 0 ? (
          results.map((item) => (
            <button
              key={item.id}
              css={DropdownContent}
              onClick={() => onItemSelect(item)}
            >
              <LocationIcon fill={color.GrayScale.gray4} />
              <div css={DropdownText}>
                <p css={DropdownTextName}>{item.name}</p>
                <p css={DropdownTextAddr}>{item.addr}</p>
              </div>
            </button>
          ))
        ) : (
          <div css={DropdownContent}>
            <InfoIcon fill={color.GrayScale.gray4} />
            <p css={NoContentText}>검색 결과가 없어요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressDropdown;
