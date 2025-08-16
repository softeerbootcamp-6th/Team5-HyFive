import { useEffect, useState } from "react";

interface UsePreviewImageProps {
  value: File | string | null;
}

const usePreviewImage = ({ value }: UsePreviewImageProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    //url인 이미 업로드된 이미지인 경우 처리
    if (typeof value === "string") {
      setPreviewUrl(value);
      return;
    }

    //url이 아닌 직접 업로드한 이미지인 경우 처리
    if (value) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  return {
    previewUrl,
  };
};

export default usePreviewImage;
