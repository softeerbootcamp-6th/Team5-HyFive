import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
const { color, typography } = theme;

const ImageInput = () => {
  return (
    <div>
      <div css={LabelContainer}>
        <label css={InputLabelText}>차량 사진 등록</label>
        <span css={RequiredStar}>*</span>{" "}
      </div>
      <div css={ImageUploaderWrapper}>
        <div css={TextWrapper}>
          <p css={TitleText}>업로드할 파일을 끌어다 놓으세요.</p>
          <p css={DescriptionText}>
            JPG, PNG 형식의 파일을 업로드할 수 있습니다.
          </p>
        </div>
        <div css={Linktext}>파일 브라우저</div>
      </div>
    </div>
  );
};

export default ImageInput;

const LabelContainer = css`
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

const ImageUploaderWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 196px;
  gap: 29px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${color.GrayScale.gray3};
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
