import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { RemoveCircleIcon } from "@/assets/icons";
import { useState, type ChangeEvent } from "react";
const { color, typography } = theme;

interface ImageInputProps {
  imageSrc: string;
}
const ImageInput = ({ imageSrc }: ImageInputProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };
  const handleRemoveImage = () => {
    setFile(null);
    setPreviewUrl(null);
  };
  return (
    <div css={ImageInputContainer}>
      <div css={LabelWrapper}>
        <label css={InputLabelText}>차량 사진 등록</label>
        <span css={RequiredStar}>*</span>
      </div>
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
              JPG, PNG 형식의 파일을 업로드할 수 있습니다.
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
  );
};

export default ImageInput;

const ImageInputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LabelWrapper = css`
  display: flex;
  gap: 4px;
`;

const InputLabelText = css`
  font: ${typography.Heading.h5_semi};
  color: ${color.GrayScale.gray4};
`;

const RequiredStar = css`
  font: ${typography.Heading.h5_semi};
  color: ${color.Maincolor.primary};
`;

const ImageUploadedWrapper = css`
  position: relative;
  width: 100%;
  height: 196px;
  border-radius: 10px;
  border: 1px solid ${color.GrayScale.gray3};
  overflow: hidden;

  &:hover > div[data-hover] {
    opacity: 1;
    visibility: visible;
  }
`;

const ImagePendingWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 196px;
  gap: 29px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${color.GrayScale.gray3};
`;

const ImageWrapper = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ImageHoverWrapper = css`
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(6.5px);
  cursor: pointer;
`;

const HoverText = css`
  font: ${typography.Heading.h5_semi};
  color: ${color.GrayScale.white};
`;

const TextWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;

const TitleText = css`
  font: ${typography.Label.l3_semi};
  color: ${color.GrayScale.gray4};
`;

const DescriptionText = css`
  font: ${typography.Body.b4_regu};
  color: ${color.GrayScale.gray4};
`;

const Linktext = css`
  font: ${typography.Body.b4_medi};
  color: ${color.GrayScale.black};
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
  cursor: pointer;
`;

const ImageInputWrapper = css`
  display: none;
`;
