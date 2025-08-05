import { NoRouteIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";
import MovingCarGif from "@/assets/gif/moving_car.gif";
import { css } from "@emotion/react";
const { color, typography } = theme;

type RouteType = "pending" | "fail";
const RouteCard = ({ routeType }: { routeType: RouteType }) => {
  const ROUTE_LIST = {
    pending: {
      label: "보행 기구 유무에 맞는 차량을 찾고 있어요",
      img: <img src={MovingCarGif} alt="moving car gif" />,
    },
    fail: {
      label: "이용 가능한 경로가 없어요",
      img: <NoRouteIcon />,
    },
  };
  return (
    <div css={RouteCardContainer}>
      <p css={RouteResultText}>{ROUTE_LIST[routeType].label}</p>
      <div css={RouteResultImg(routeType)}>{ROUTE_LIST[routeType].img}</div>
    </div>
  );
};

export default RouteCard;

const RouteCardContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28px;
  padding: 44px;
`;

const RouteResultText = css`
  padding: 10px;
  color: ${color.GrayScale.gray4};
  font: ${typography.Heading.h5_semi};
  z-index: 1;
`;

const RouteResultImg = (routeType: RouteType) => css`
  ${routeType === "pending" &&
  css`
    position: absolute;
    top: 0;
    left: 0;
  `}
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
