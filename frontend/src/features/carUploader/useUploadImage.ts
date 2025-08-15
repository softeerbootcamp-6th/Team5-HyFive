import ImageValidator from "@/features/carUploader/ImageValidator.util";
import type { ChangeEvent } from "react";
import type { UseFormClearErrors, UseFormSetError } from "react-hook-form";

interface UseUploadImageProps {
  onChange: (value: File | null) => void;
  setError: UseFormSetError<{ carImage: File }>;
  clearErrors: UseFormClearErrors<{ carImage: File }>;
}

const useUploadImage = ({
  onChange,
  setError,
  clearErrors,
}: UseUploadImageProps) => {
  const handleUploadImageTemplate = (file: File) => {
    const { validateImageType, validateImageSize } = ImageValidator(file);

    if (!validateImageType()) {
      onChange(null);
      setError("carImage", { message: "JPG/PNG만 업로드 가능합니다" });
      return;
    }
    if (!validateImageSize()) {
      onChange(null);
      setError("carImage", { message: "최대 크기는 50MB입니다" });
      return;
    }
    clearErrors("carImage");
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
