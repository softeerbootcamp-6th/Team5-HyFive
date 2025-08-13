import type { ChangeEvent } from "react";

interface UseUploadImageProps {
  onChange: (value: File | null) => void;
}

const useUploadImage = ({ onChange }: UseUploadImageProps) => {
  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    onChange(selectedFile);
  };

  const handleUploadImageByDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer?.files[0] && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer?.files[0];
      onChange(selectedFile);
    }
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
