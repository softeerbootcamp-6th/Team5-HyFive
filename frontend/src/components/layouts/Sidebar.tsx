import { CarIcon, DashboardIcon, PersonIcon, RouteIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
import { Link } from "react-router";

interface SidebarContent {
  label: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  route: string;
}

const Sidebar = () => {
  const SIDEBAR_CONTENT: SidebarContent[] = [
    {
      label: "실시간 예약 현황",
      icon: <DashboardIcon fill={theme.color.GrayScale.white} />,
      route: "/admin/book",
    },
    {
      label: "실시간 운행 현황",
      icon: <CarIcon fill={theme.color.GrayScale.white} />,
      route: "/admin/book/schedule",
    },
    {
      label: "예약자 관리",
      icon: <PersonIcon fill={theme.color.GrayScale.white} />,
      route: "/admin/book/users",
    },
    {
      label: "운행 경로 관리",
      icon: <RouteIcon fill={theme.color.GrayScale.white} />,
      route: "/admin/book/paths",
    },
  ] as const;
  return (
    <div css={SidebarConatiner}>
      <Link css={ContentButton} to="/admin/book/register">
        신규 예약 접수
      </Link>
      <ul>
        {SIDEBAR_CONTENT.map((content) => (
          <Link to={content.route} key={content.label} css={ContentLi}>
            {content.icon}
            <p>{content.label}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

const SidebarConatiner = css`
  background-color: ${theme.color.GrayScale.black};
  width: 330px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 30px 20px;
  font: ${theme.typography.Label.l4_semi};
  color: ${theme.color.GrayScale.white};
`;

export const ContentButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 20px;
  border-radius: ${theme.borderRadius.Medium};
  font: ${theme.typography.Label.l4_semi};
  color: ${theme.color.GrayScale.white};
  background-color: ${theme.color.Maincolor.primary};
`;

export const ContentLi = css`
  display: flex;
  flex-direction: row;
  gap: 11px;
  padding: 12px 20px;
`;
