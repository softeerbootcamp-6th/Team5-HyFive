/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Input from "@/components/common/Input";
import { CalenderIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";

const TestPage = () => {
  const components = [
    {
      label: "폼 컴포넌트",
      component: (
        <Input
          type="text"
          label={"예약날짜"}
          required={true}
          icon={<CalenderIcon fill={theme.color.GrayScale.gray4} />}
          placeholder="날짜를 선택해주세요"
        />
      ),
    },
    { label: "토글 컴포넌트", component: <div>토글 자리</div> },
    { label: "헤더 컴포넌트", component: <div>헤더 자리</div> },
    { label: "탭 컴포넌트", component: <div>탭 자리</div> },
    { label: "태그 컴포넌트", component: <div>태그 자리</div> },
    { label: "드롭다운(기본형)", component: <div>드롭다운 자리</div> },
  ];

  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>Component Library</h1>
      <div css={gridStyle}>
        {components.map((item) => (
          <div key={item.label} css={cardStyle}>
            <h3 css={cardTitleStyle}>{item.label}</h3>
            <div css={componentWrapperStyle}>{item.component}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestPage;
const containerStyle = css`
  padding: 40px;
  font-family: sans-serif;
`;

const titleStyle = css`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const cardStyle = css`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const cardTitleStyle = css`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1e1e1e;
  border-bottom: 1px solid #eee;
  width: 100%;
  text-align: center;
  padding-bottom: 8px;
`;

const componentWrapperStyle = css`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
