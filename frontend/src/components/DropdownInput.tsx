import { ChevronDownIcon, ChevronUpIcon } from "@/assets/icons";
import Input from "@/components/Input";
import { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

const { color, typography, borderRadius } = theme;

interface DropdownInputProps {
  label: string;
  required?: boolean;
  requiredLabel?: string;
  placeholder?: string;
  options: string[] | number[];
  value: string | number;
  onSelect?: (value: string | number) => void;
}

const DropdownInput = ({
  label,
  required = false,
  requiredLabel = "",
  placeholder,
  options,
  value,
  onSelect,
}: DropdownInputProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string | number) => {
    onSelect?.(option);
    setIsOpen(false);
  };

  // 드롭다운 외부 클릭시 닫히는 로직
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div css={DropdownContainer} ref={containerRef}>
      <Input
        label={label}
        required={required}
        requiredLabel={requiredLabel}
        placeholder={placeholder}
        readOnly
        onClick={() => setIsOpen((prev) => !prev)}
        icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        value={value}
      />
      {isOpen && (
        <ul css={DropdownList}>
          {options.map((option) => (
            <li
              css={DropdownItem}
              key={option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownInput;

const DropdownContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DropdownList = css`
  display: flex;
  flex-direction: column;
  gap: 8px;

  position: absolute;
  top: calc(100% + 14px);
  left: 0;
  width: 100%;
  z-index: 10;

  max-height: 200px;
  overflow-y: auto;

  border: 1px solid ${color.GrayScale.gray3};
  border-radius: ${borderRadius.Medium};
  background-color: ${color.GrayScale.white};
`;

const DropdownItem = css`
  padding: 12px 24px;
  font: ${typography.Body.b3_regu};
  color: ${color.GrayScale.gray4};
  border-radius: ${borderRadius.Small};
  cursor: pointer;

  &:hover {
    background-color: ${color.GrayScale.gray1};
  }
`;
