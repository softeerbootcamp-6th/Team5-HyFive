import { LogoIcon } from "@/assets/icons";
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { Link, useLocation, useNavigate } from "react-router";
import Tabs from "@/components/common/Tabs";

const { color, typography } = theme;

type UserType = "ADMIN" | "CENTER";

interface HeaderProps {
  type: UserType;
  hasTab?: boolean;
}

const Header = ({ type, hasTab = false }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabItems = [
    { label: "예약 · 운행 관리", path: "/admin/book" },
    { label: "센터 차량 관리", path: "/admin/centers" },
    { label: "운전 기사 관리", path: "/admin/drivers" },
  ];

  // 현재 URL 경로에 해당하는 탭 항목 찾기
  const currentTab = tabItems.find((item) =>
    location.pathname.startsWith(item.path),
  );

  // 일치하는 탭이 없을 경우 기본 탭(label) 지정
  const selectedTab = currentTab?.label ?? tabItems[0].label;

  const handleTabChange = (label: string) => {
    const target = tabItems.find((item) => item.label === label);
    if (target) navigate(target.path);
  };
  return (
    <div css={HeaderContainer}>
      <div css={LogoSection}>
        <Link to={type === "ADMIN" ? "/admin" : "/center"}>
          <LogoIcon />
        </Link>
        <div css={UserTypeLabel}>
          {type === "ADMIN" ? "관리자용" : "센터용"}
        </div>
      </div>
      {hasTab && (
        <Tabs
          type="bar_false"
          group={tabItems.map((item) => item.label)}
          selected={selectedTab}
          setSelected={handleTabChange}
        />
      )}
    </div>
  );
};

export default Header;

const HeaderContainer = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  display: flex;
  padding: 0 40px;
  background-color: ${color.GrayScale.black};
  align-items: center;
  justify-content: space-between;
`;

const LogoSection = css`
  display: flex;
  gap: 20px;
`;

const UserTypeLabel = css`
  display: flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;

  border-radius: 200px;
  border: 1px solid ${color.GrayScale.white};

  font: ${typography.Body.b4_medi};
  color: ${color.GrayScale.white};
`;
