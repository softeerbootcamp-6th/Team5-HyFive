import DropdownInput from "@/components/DropdownInput";
import Input from "@/components/Input";
import ToggleButton from "@/components/ToggleButton";
import ImageInput from "@/features/carUploader/ImageInput";
import { css } from "@emotion/react";
import Button from "@/components/Button";
import { Controller } from "react-hook-form";
import useCarForm, {
  type CarFormValues,
} from "@/features/carUploader/useCarForm";
import { useMemo } from "react";
import { usePatchCar, usePostCar } from "@/apis/CarAPI";

type InputMode = "register" | "edit";
interface InputSectionProps {
  type?: InputMode;
  initValues?: CarFormValues & { carId: number };
}
const InputSection = ({ type = "register", initValues }: InputSectionProps) => {
  const MAX_PASSENGER = 25;
  const dropdownOptions = Array.from({ length: MAX_PASSENGER }, (_, index) =>
    String(index + 1),
  );

  const {
    register,
    control,
    watch,
    handleSubmit,
    handleReset,
    clearErrors,
    formState: { errors, isValid },
  } = useCarForm(initValues);

  const watchValues = watch();
  const isChanged = useMemo(() => {
    if (!initValues) return true; // 등록인 경우 변경 발생함으로 간주
    return Object.keys(initValues).some(
      (key) =>
        watchValues[key as keyof CarFormValues] !==
        initValues[key as keyof CarFormValues],
    );
  }, [watchValues, initValues]);

  const { mutate: postMutate } = usePostCar();
  const { mutate: patchMutate } = usePatchCar();

  return (
    <form
      css={InputSectionContainer}
      onSubmit={handleSubmit((formValues) => {
        if (type === "register") {
          postMutate(formValues, {
            onSuccess: () => {
              handleReset();
              alert("차량 등록에 성공했습니다!");
            },
            onError: (response) => {
              alert(response);
            },
          });
        } else if (initValues?.carId != null) {
          patchMutate(
            { id: initValues.carId, values: formValues },
            {
              onSuccess: () => {
                handleReset();
                alert("차량 수정에 성공했습니다!");
              },
              onError: (response) => {
                alert(response);
              },
            },
          );
        }
      })}
    >
      <Controller
        name="carImage"
        control={control}
        render={({ field }) => (
          <ImageInput
            value={field.value}
            onChange={(value) => field.onChange(value)}
            clearErrors={clearErrors}
            errorMessage={errors.carImage?.message?.toString()}
          />
        )}
      />
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
        bgColor={isChanged && isValid ? "orange" : "gray"}
        label={type === "register" ? "등록하기" : "수정하기"}
        size="big"
        disabled={!isChanged}
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
