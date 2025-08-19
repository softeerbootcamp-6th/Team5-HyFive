import { useState } from "react";
import { theme } from "@/styles/themes.style";
import { SearchIcon, ThreeDotsIcon } from "@/assets/icons";
import Input from "@/components/Input";
import AddressDropdown, { type AddressItem } from "./AddressDropdown";
import { AddrInputContainer, InputSection } from "./AddressInput.style";

const { color } = theme;

const AddressInput = () => {
  const [focusedInput, setFocusedInput] = useState<
    "departure" | "destination" | null
  >(null);
  const [values, setValues] = useState({
    departure: "",
    destination: "",
  });

  const tmpList: AddressItem[] = [
    {
      id: 1,
      name: "상계요양원",
      addr: "서울특별시 노원구 동일로242바길 27",
    },
    {
      id: 2,
      name: "상계 요양보호사 교육원",
      addr: "서울특별시 노원구 덕릉로 814 재원빌딩 5f 상계요양보호사 교육원",
    },
    {
      id: 3,
      name: "상계 요양보호사 교육원",
      addr: "서울특별시 노원구 덕릉로 814 재원빌딩 5f 상계요양보호사 교육원",
    },
    {
      id: 4,
      name: "상계 요양보호사 교육원",
      addr: "서울특별시 노원구 덕릉로 814 재원빌딩 5f 상계요양보호사 교육원",
    },
  ];

  const handleInputFocus = (type: "departure" | "destination") => {
    setFocusedInput(type);
  };

  const handleItemSelect = (item: AddressItem) => {
    if (!focusedInput) return;
    setValues((prev) => ({ ...prev, [focusedInput]: item.name }));
    setFocusedInput(null);
  };

  const handleCloseDropdown = () => {
    setFocusedInput(null);
  };

  return (
    <div css={AddrInputContainer}>
      <div css={InputSection}>
        <div onClick={() => handleInputFocus("departure")}>
          <Input
            label="출발지"
            icon={<SearchIcon fill={color.GrayScale.gray4} />}
            placeholder="탑승 위치 입력"
            value={values.departure}
            onClick={() => handleInputFocus("departure")}
          />
        </div>
        <ThreeDotsIcon style={{ marginTop: "55px" }} />
        <div onClick={() => handleInputFocus("destination")}>
          <Input
            label="도착지"
            icon={<SearchIcon fill={color.GrayScale.gray4} />}
            placeholder="병원 위치 입력"
            value={values.destination}
            onClick={() => handleInputFocus("destination")}
          />
        </div>
      </div>

      {focusedInput && (
        <AddressDropdown
          type={focusedInput}
          results={tmpList}
          onItemSelect={handleItemSelect}
          onClose={handleCloseDropdown}
        />
      )}
    </div>
  );
};

export default AddressInput;
