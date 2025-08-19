import { useState } from "react";

interface UseDragImageProps {
  handleUploadImage: (e: React.DragEvent<HTMLDivElement>) => void;
}
const useDragImage = ({ handleUploadImage }: UseDragImageProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDropImage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleUploadImage(e);
    setDragActive(false);
  };

  const handleDragActive = (
    e: React.DragEvent<HTMLDivElement>,
    active: boolean,
  ) => {
    e.preventDefault();
    setDragActive(active);
  };

  return {
    dragActive,
    handleDropImage,
    handleDragActive,
  };
};

export default useDragImage;
