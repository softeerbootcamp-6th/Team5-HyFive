import DropdownInput from "@/components/DropdownInput";
import Input from "@/components/Input";
import ToggleButton from "@/components/ToggleButton";
import ImageInput from "@/features/carUploader/ImageInput";
import { css } from "@emotion/react";
import OriginCarImg from "@/assets/images/OriginalCarImg.png";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";

const InputSection = () => {
  const dropdownOptions = Array.from({ length: 5 }, (_, index) => index + 1);

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      carModel: "",
      carNumber: "",
      maxPassenger: 0,
      isLowFloor: false,
    },
  });

  return (
    <form
      css={InputSectionContainer}
      onSubmit={handleSubmit((e) => console.log(e))}
    >
      <ImageInput imageSrc={OriginCarImg} />
      <Input
        label={"모델명"}
        required={true}
        placeholder="모델명을 입력해주세요"
        readOnly={false}
        register={register("carModel", { required: true })}
      />
      <Input
        label={"차량 번호"}
        required={true}
        placeholder="차량 번호를 입력해주세요"
        readOnly={false}
        register={register("carNumber", { required: true })}
      />
      <Controller
        name="maxPassenger"
        control={control}
        render={({ field }) => (
          <DropdownInput
            label="최대탑승 인원"
            required={true}
            requiredLabel="운전자 제외"
            placeholder="인원"
            options={dropdownOptions}
            value={field.value}
            onSelect={(value) => field.onChange(value)}
          />
        )}
      />
      <Controller
        name="isLowFloor"
        control={control}
        render={({ field }) => (
          <ToggleButton
            type="check"
            label="저상형"
            isChecked={field.value}
            onToggle={() => {
              field.onChange(!field.value);
            }}
          />
        )}
      />
      <Button type="submit" bgColor="gray" label="등록하기" size="big" />
    </form>
  );
};

export default InputSection;

const InputSectionContainer = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
