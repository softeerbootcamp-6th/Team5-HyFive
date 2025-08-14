import ImageValidator from "@/features/carUploader/ImageValidator.util";
import type { ChangeEvent } from "react";
import type { UseFormSetError } from "react-hook-form";

interface UseUploadImageProps {
  onChange: (value: File | null) => void;
  setError: UseFormSetError<{ carImage: File }>;
}

const useUploadImage = ({ onChange, setError }: UseUploadImageProps) => {
  const handleUploadImageTemplate = (file: File) => {
    const { validateImageType, validateImageSize } = ImageValidator(file);

    if (!validateImageType()) {
      setError("carImage", { message: "JPG/PNG만 업로드 가능합니다" });
      return;
    }
    if (!validateImageSize()) {
      setError("carImage", { message: "최대 크기는 50MB입니다" });
      return;
    }

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
