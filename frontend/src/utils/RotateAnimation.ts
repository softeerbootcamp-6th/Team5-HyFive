import { keyframes, css } from "@emotion/react";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const rotating = css`
  animation: ${rotate360} 0.8s linear;
`;
