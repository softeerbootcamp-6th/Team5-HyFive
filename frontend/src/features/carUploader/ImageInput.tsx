import { RemoveCircleIcon } from "@/assets/icons";
import useDragImage from "@/features/carUploader/useDragImage";
import useUploadImage from "@/features/carUploader/useUploadImage";
import usePreviewImage from "@/features/carUploader/usePreviewImage";
import {
  DescriptionText,
  ErrorText,
  HoverText,
  ImageContainer,
  ImageHoverWrapper,
  ImageInputContainer,
  ImageInputWrapper,
  ImagePendingWrapper,
  ImageUploadedWrapper,
  ImageWrapper,
  InputLabelText,
  LabelWrapper,
  Linktext,
  RequiredStar,
  TextWrapper,
  TitleText,
} from "@/features/carUploader/ImageInput.styles";
import useDocumentEvent from "@/hooks/useDocumentEvent";
import type { UseFormClearErrors } from "react-hook-form";
import { useState } from "react";

interface ImageInputProps {
  value: File | string | null;
  onChange: (value: File | null) => void;
  errorMessage?: string;
  clearErrors: UseFormClearErrors<{ carImage: File }>;
}
const ImageInput = ({
  value,
  onChange,
  clearErrors,
  errorMessage,
}: ImageInputProps) => {
  const [realTimeError, setRealTimeError] = useState<string | null>(null);

  useDocumentEvent();
  const { handleUploadImage, handleUploadImageByDrag, handleRemoveImage } =
    useUploadImage({ onChange, setRealTimeError, clearErrors });
  const { previewUrl } = usePreviewImage({ value });
  const { dragActive, handleDropImage, handleDragActive } = useDragImage({
    handleUploadImage: handleUploadImageByDrag,
  });

  return (
    <div css={ImageInputContainer}>
      <div css={LabelWrapper}>
        <label css={InputLabelText}>차량 사진 등록</label>
        <span css={RequiredStar}>*</span>
      </div>
      <div
        onDragOver={(e) => handleDragActive(e, true)}
        onDragLeave={(e) => handleDragActive(e, false)}
        onDrop={handleDropImage}
        css={ImageContainer(dragActive, errorMessage)}
      >
        {previewUrl ? (
          <div css={ImageUploadedWrapper}>
            <img src={previewUrl} alt="car image" css={ImageWrapper} />
            <div data-hover onClick={handleRemoveImage} css={ImageHoverWrapper}>
              <RemoveCircleIcon />
              <p css={HoverText}>사진 지우기</p>
            </div>
          </div>
        ) : (
          <div css={ImagePendingWrapper}>
            <div css={TextWrapper}>
              <p css={TitleText}>업로드할 파일을 끌어다 놓으세요.</p>
              <p css={DescriptionText}>
                JPG, PNG, GIF, WEBP 형식의 파일을 업로드할 수 있습니다.
              </p>
            </div>
            <label htmlFor="carImage" css={Linktext}>
              파일 브라우저
            </label>
            <input
              id="carImage"
              type="file"
              accept="image/*"
              css={ImageInputWrapper}
              onChange={handleUploadImage}
            />
          </div>
        )}
      </div>
      {(errorMessage || realTimeError) && (
        <p css={ErrorText}>{realTimeError ? realTimeError : errorMessage}</p>
      )}
    </div>
  );
};

export default ImageInput;
