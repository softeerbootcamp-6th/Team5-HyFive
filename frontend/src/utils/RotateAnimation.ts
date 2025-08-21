import { keyframes, css } from "@emotion/react";

export const ROTATING_TIME = 0.8;
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const rotating = css`
  animation: ${rotate360} ${ROTATING_TIME}s linear;
`;
