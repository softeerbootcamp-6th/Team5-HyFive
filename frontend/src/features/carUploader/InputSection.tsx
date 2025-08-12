import DropdownInput from "@/components/DropdownInput";
import Input from "@/components/Input";
import ToggleButton from "@/components/ToggleButton";
import ImageInput from "@/features/carUploader/ImageInput";
import { css } from "@emotion/react";
import OriginCarImg from "@/assets/images/OriginalCarImg.png";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const InputSection = () => {
  const MAX_PASSENGER = 25;
  const dropdownOptions = Array.from({ length: MAX_PASSENGER }, (_, index) =>
    String(index + 1),
  );
  const carSchema = z
    .object({
      carModel: z.string().min(1, "필수 입력값입니다"),
      carNumber: z
        .string()
        .refine((value) => /^\d{2,3}[가-힣]\d{4}$/.test(value), {
          message: "올바른 차량 번호 형식이 아닙니다 (예: 12가3456)",
        }),
      maxPassenger: z.string().refine((value) => value !== "", {
        message: "필수 입력값입니다",
      }),
      isLowFloor: z.boolean(),
    })
    .refine((data) => data.carModel);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    resolver: zodResolver(carSchema),
    defaultValues: {
      carModel: "",
      carNumber: "",
      maxPassenger: "",
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
