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
import { useMemo, useState } from "react";
import { usePatchCar, usePostCar } from "@/apis/CarAPI";
import { useNavigate } from "react-router";
import Modal from "@/components/Modal";
import ModalContent from "@/components/ModalContent";
import type { CustomError } from "@/utils/CustomError";

type InputMode = "register" | "edit";
interface InputSectionProps {
  type?: InputMode;
  initValues?: CarFormValues & { carId: number };
}
interface ModalState {
  isOpen: boolean;
  isSuccess: boolean | null;
  content: string;
}
const InputSection = ({ type = "register", initValues }: InputSectionProps) => {
  const MAX_PASSENGER = 25;
  const dropdownOptions = Array.from({ length: MAX_PASSENGER }, (_, index) =>
    String(index + 1),
  );

  // form 관련 로직
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

  // 서버 통신 관련 로직
  const { mutate: postMutate } = usePostCar();
  const { mutate: patchMutate } = usePatchCar();
  const messageType = type === "register" ? "등록" : "수정";
  const navigate = useNavigate();

  // modal 관련 로직
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    isSuccess: null,
    content: "",
  });

  const handleMutateSuccess = () => {
    handleReset();
    handleReset();
    setModalState({
      isOpen: true,
      isSuccess: true,
      content: `차량 ${messageType}에 성공했습니다!`,
    });
  };

  const handleMutateError = (response: CustomError) => {
    setModalState({
      isOpen: true,
      isSuccess: false,
      content: response.message ?? `차량 ${messageType}에 실패했습니다 :(`,
    });
  };

  const handleModalClose = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (modalState.isSuccess) void navigate("/center");
  };

  return (
    <form
      css={InputSectionContainer}
      onSubmit={handleSubmit((formValues) => {
        if (type === "register") {
          postMutate(formValues, {
            onSuccess: handleMutateSuccess,
            onError: (response) => handleMutateError(response),
          });
        }
        if (type === "edit") {
          if (!initValues) return;
          patchMutate(
            { id: initValues.carId, values: formValues },
            {
              onSuccess: handleMutateSuccess,
              onError: (response) => handleMutateError(response),
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
      <Modal isOpen={modalState.isOpen} onClose={handleModalClose}>
        <ModalContent
          type="alert"
          content={modalState.content}
          onClose={handleModalClose}
        />
      </Modal>
    </form>
  );
};

export default InputSection;

const InputSectionContainer = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
