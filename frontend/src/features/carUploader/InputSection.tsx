import DropdownInput from "@/components/DropdownInput";
import Input from "@/components/Input";
import ToggleButton from "@/components/ToggleButton";
import ImageInput from "@/features/carUploader/ImageInput";
import { css } from "@emotion/react";
import OriginCarImg from "@/assets/images/OriginalCarImg.png";
import Button from "@/components/Button";
import { Controller } from "react-hook-form";
import useCarForm from "@/features/carUploader/useCarForm";

const InputSection = () => {
  const MAX_PASSENGER = 25;
  const dropdownOptions = Array.from({ length: MAX_PASSENGER }, (_, index) =>
    String(index + 1),
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useCarForm();

  return (
    <form
      css={InputSectionContainer}
      onSubmit={handleSubmit(() => {
        reset();
      })}
    >
      <ImageInput imageSrc={OriginCarImg} />
      <Input
        label={"모델명"}
        required={true}
        placeholder="모델명을 입력해주세요"
        readOnly={false}
        register={register("carModel", { required: true })}
        errorMessage={errors.carModel?.message}
      />
      <Input
        label={"차량 번호"}
        required={true}
        placeholder="차량 번호를 입력해주세요"
        readOnly={false}
        register={register("carNumber", { required: true })}
        errorMessage={errors.carNumber?.message}
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
            errorMessage={errors.maxPassenger?.message}
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
      <Button
        type="submit"
        bgColor={isValid ? "orange" : "gray"}
        label="등록하기"
        size="big"
      />
    </form>
  );
};

export default InputSection;

const InputSectionContainer = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
