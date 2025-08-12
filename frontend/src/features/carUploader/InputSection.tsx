import DropdownInput from "@/components/DropdownInput";
import Input from "@/components/Input";
import ToggleButton from "@/components/ToggleButton";
import ImageInput from "@/features/carUploader/ImageInput";
import { css } from "@emotion/react";
import OriginCarImg from "@/assets/images/OriginalCarImg.png";

const InputSection = () => {
  const dropdownOptions = Array.from({ length: 5 }, (_, index) =>
    String(index + 1),
  );

  return (
    <div css={InputSectionContainer}>
      <ImageInput imageSrc={OriginCarImg} />
      <Input
        label={"모델명"}
        required={true}
        placeholder="모델명을 입력해주세요"
        readOnly={false}
      />
      <Input
        label={"차량 번호"}
        required={true}
        placeholder="차량 번호를 입력해주세요"
        readOnly={false}
      />
      <DropdownInput
        label="최대탑승 인원"
        required={true}
        requiredLabel="운전자 제외"
        placeholder="인원"
        options={dropdownOptions}
        value={""}
        onSelect={() => {}}
      />
      <ToggleButton
        type="check"
        label="저상형"
        isChecked={true}
        onToggle={() => {}}
      />
    </div>
  );
};

export default InputSection;

const InputSectionContainer = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
