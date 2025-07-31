import { CarIcon, DashboardIcon, PersonIcon, RouteIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";

interface SidebarContent {
  label: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

const Sidebar = () => {
  const sidebarContent: SidebarContent[] = [
    {
      label: "실시간 예약 현황",
      icon: <DashboardIcon fill={theme.color.GrayScale.white} />,
    },
    {
      label: "실시간 운행 현황",
      icon: <CarIcon fill={theme.color.GrayScale.white} />,
    },
    {
      label: "예약자 관리",
      icon: <PersonIcon fill={theme.color.GrayScale.white} />,
    },
    {
      label: "운행 경로 관리",
      icon: <RouteIcon fill={theme.color.GrayScale.white} />,
    },
  ];
  return (
    <div css={SidebarConatiner}>
      <div css={ContentButton}>신규 예약 접수</div>
      <ul>
        {sidebarContent.map((content) => (
          <li key={content.label} css={ContentLi}>
            {content.icon}
            <p>{content.label}</p>
          </li>
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
