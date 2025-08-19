import { CloseIcon, LocationIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";
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
} from "./AddressInput.style";

const { color } = theme;

export interface AddressItem {
  id: number;
  name: string;
  addr: string;
}

interface AddressDropdownProps {
  type: "departure" | "destination";
  results: AddressItem[];
  onItemSelect: (item: AddressItem) => void;
  onClose: () => void;
}

const AddressDropdown = ({
  type,
  results,
  onItemSelect,
  onClose,
}: AddressDropdownProps) => {
  const headerText = type === "departure" ? "출발지 검색" : "도착지 검색";

  return (
    <div css={DropdownContainer}>
      <header css={DropdownHeader}>
        <h3 css={HeaderStyle}>{headerText}</h3>
        <button onClick={onClose} css={CloseButtonStyle}>
          <CloseIcon fill={color.GrayScale.gray4} />
        </button>
      </header>
      <div css={DropdownContentList}>
        {results.map((item) => (
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
        ))}
      </div>
    </div>
  );
};

export default AddressDropdown;
