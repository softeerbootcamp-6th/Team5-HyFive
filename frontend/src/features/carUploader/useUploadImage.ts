import ImageValidator from "@/features/carUploader/ImageValidator.util";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { UseFormClearErrors } from "react-hook-form";

interface UseUploadImageProps {
  onChange: (value: File | null) => void;
  setRealTimeError: Dispatch<SetStateAction<string | null>>;
  clearErrors: UseFormClearErrors<{ carImage: File }>;
}

const useUploadImage = ({
  onChange,
  setRealTimeError,
  clearErrors,
}: UseUploadImageProps) => {
  const handleUploadImageTemplate = (file: File) => {
    const { validateImageType, validateImageSize } = ImageValidator(file);

    if (!validateImageType()) {
      onChange(null);
      setRealTimeError("이미지만 업로드 가능합니다");
      return;
    }
    if (!validateImageSize()) {
      onChange(null);
      setRealTimeError("최대 크기는 50MB입니다");
      return;
    }
    clearErrors("carImage");
    setRealTimeError(null);
    onChange(file);
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    handleUploadImageTemplate(selectedFile);
  };

  const handleUploadImageByDrag = (e: React.DragEvent<HTMLDivElement>) => {
    const selectedFile = e.dataTransfer?.files[0];
    if (!selectedFile) return;
    handleUploadImageTemplate(selectedFile);
  };

  const handleRemoveImage = () => {
    onChange(null);
  };

  return {
    handleUploadImage,
    handleUploadImageByDrag,
    handleRemoveImage,
  };
};

export default useUploadImage;
