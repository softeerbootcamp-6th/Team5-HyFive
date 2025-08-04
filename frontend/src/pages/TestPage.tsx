/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button from "@/components/button/Button";
import Chip from "@/components/chip/Chip";
import SearchInput from "@/components/search/SearchInput";
import BookCard from "@/components/statusCard/BookCard";
import DrivingCard from "@/components/statusCard/DrivingCard";
import Table from "@/components/table/Table";
import TableWithIndex from "@/components/table/TableWithIndex";
import { bookDataList } from "@/mocks/bookMocks";
import { drivingDataList } from "@/mocks/drivingMocks";
import { routeDataList } from "@/mocks/routeMocks";
import { rowsCenter, rowsOrder, rowsUser } from "@/mocks/tableMocks";
import { userDataList } from "@/mocks/usersMocks";
import TableMatcher from "@/utils/TableMatcher";

const TestPage = () => {
  const { userRows, bookingRows, routeRows } =
    TableMatcher.matchBookTableType(rowsUser);

  const components = [
    {
      label: "📋 Table 컴포넌트",
      component: (
        <div css={componentGroupStyle}>
          <Table rows={rowsOrder} />
          <Table rows={rowsCenter} />
          <Table rows={userRows} />
          <Table rows={bookingRows} />
          <Table rows={routeRows} />
        </div>
      ),
    },
    {
      label: "📋 TableWithIndex 컴포넌트",
      component: (
        <div css={componentGroupStyle}>
          <TableWithIndex rows={userDataList} />
          <TableWithIndex rows={routeDataList} />
        </div>
      ),
    },
    {
      label: "🚐 예약 정보 카드",
      component: (
        <div css={horizontalCardStyle}>
          <BookCard bookType="pending" data={bookDataList[0]} />
          <BookCard bookType="success" data={bookDataList[1]} />
          <BookCard bookType="fail" data={bookDataList[2]} />
        </div>
      ),
    },
    {
      label: "🚐 운행 정보 카드",
      component: (
        <div css={horizontalCardStyle}>
          <DrivingCard drivingType="waiting" data={drivingDataList[0]} />
          <DrivingCard drivingType="progress" data={drivingDataList[1]} />
          <DrivingCard drivingType="end" data={drivingDataList[2]} />
        </div>
      ),
    },
    {
      label: "🔍 검색 컴포넌트",
      component: (
        <div css={searchStyle}>
          <SearchInput searchType="user" />
          <SearchInput searchType="route" />
        </div>
      ),
    },
    {
      label: "🏷️ 칩 컴포넌트",
      component: (
        <div css={chipStyle}>
          <Chip chipType="stroke" isActive={false} content="chip" />
          <Chip chipType="stroke" isActive={true} content="chip" />
          <Chip chipType="fill" isActive={false} content="chip" />
          <Chip chipType="fill" isActive={true} content="chip" />
        </div>
      ),
    },
    {
      label: "🔘 버튼 컴포넌트",
      component: (
        <div css={buttonStyle}>
          <Button bgColor="gray" size="small" />
          <Button bgColor="orange" size="small" />
          <Button bgColor="gray" size="big" />
          <Button bgColor="orange" size="big" />
        </div>
      ),
    },
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
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
`;

const cardStyle = css`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
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
  width: 100%;
`;

const componentGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const horizontalCardStyle = css`
  display: flex;
  gap: 12px;
`;

const chipStyle = css`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const buttonStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const searchStyle = css`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;
