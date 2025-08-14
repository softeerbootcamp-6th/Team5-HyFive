import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
const { color, typography } = theme;

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

const getImageContainerBorder = (
  dragActive: boolean,
  errorMessage: string | undefined,
) => {
  if (errorMessage) return `1px solid ${color.Semantic.error}`;
  if (dragActive) return `2px dotted ${color.Maincolor.primary}`;
  return `1px solid ${color.GrayScale.gray3}`;
};

const ImageContainer = (
  dragActive: boolean,
  errorMessage: string | undefined,
) => css`
  border-radius: 10px;
  border: ${getImageContainerBorder(dragActive, errorMessage)};
`;

const ImageUploadedWrapper = css`
  position: relative;
  width: 100%;
  height: 196px;
  overflow: hidden;

  &:hover > div[data-hover] {
    opacity: 1;
    visibility: visible;
    border-radius: 10px;
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

const ErrorText = css`
  font: ${typography.Body.b4_regu};
  color: ${color.Semantic.error};
`;

export {
  ImageInputContainer,
  LabelWrapper,
  InputLabelText,
  RequiredStar,
  ImageContainer,
  ImageUploadedWrapper,
  ImagePendingWrapper,
  ImageWrapper,
  ImageHoverWrapper,
  HoverText,
  TextWrapper,
  TitleText,
  DescriptionText,
  Linktext,
  ImageInputWrapper,
  ErrorText,
};
