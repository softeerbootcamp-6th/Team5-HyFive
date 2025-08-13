import { useEffect, useState } from "react";

interface UsePreviewImageProps {
  value: File | null;
}

const usePreviewImage = ({ value }: UsePreviewImageProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
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
