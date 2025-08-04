/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import Button from "@/components/Button";
import { theme } from "@/styles/themes.style";
import Chip from "@/components/Chip";
import SearchInput from "@/components/SearchInput";
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
import { CalenderIcon, TimeIcon } from "@/assets/icons";

import RadioGroup from "@/components/RadioGroup";
import Tabs from "@/components/Tabs";
import Tag from "@/components/Tag";
import Input from "@/components/Input";
import ToggleButton from "@/components/ToggleButton";
import DropdownInput from "@/components/DropdownInput";

const TestPage = () => {
  const { userRows, bookingRows, routeRows } =
    TableMatcher.matchBookTableType(rowsUser);

  // 체크버튼 상태
  const [toggleState, setToggleState] = useState(false);

  // 라디오 버튼 상태
  const radioGroupItem = ["소유", "미소유"];
  const [selectedState, setSelectedState] = useState("소유");

  // 탭 상태
  const tapGroupItem = ["신규 예약 5", "예약 성공 16", "예약 실패 7"];
  const [tabState, setTabState] = useState("신규 예약 5");

  // 드롭다운 상태
  const [maxPassenger, setMaxPassenger] = useState<string>("");
  const dropdownOptions = ["1", "2", "3", "4", "5", "6", "7"];
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
    {
      label: "폼 컴포넌트",
      component: (
        <div
          css={css`
            display: flex;
            width: 100%;
            flex-direction: column;
            gap: 16px;
          `}
        >
          <Input
            label={"이름"}
            required={true}
            placeholder="홍길동"
            readOnly={false}
          />
          <Input
            label={"예약날짜"}
            required={true}
            icon={<CalenderIcon fill={theme.color.GrayScale.gray4} />}
            placeholder="날짜를 선택해주세요"
            readOnly={true}
          />
          <Input
            label={"병원 도착 시간"}
            required={false}
            icon={<TimeIcon fill={theme.color.GrayScale.gray4} />}
            placeholder="병원 도착 시간을 입력해주세요"
            readOnly={true}
          />
        </div>
      ),
    },
    {
      label: "체크버튼 컴포넌트",
      component: (
        <ToggleButton
          type="check"
          label="저상형"
          isChecked={toggleState}
          onToggle={() => setToggleState(!toggleState)}
        />
      ),
    },
    {
      label: "라디오 버튼 컴포넌트",
      component: (
        <RadioGroup
          label="보행 특이사항 (보행기구 유무)"
          group={radioGroupItem}
          selected={selectedState}
          setSelected={setSelectedState}
        />
      ),
    },
    {
      label: "탭 컴포넌트",
      component: (
        <div
          style={{
            width: "550px",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tabs
            type="bar_true"
            group={tapGroupItem}
            selected={tabState}
            setSelected={setTabState}
          />
          <div
            style={{
              width: "100%",
              marginTop: "14px",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#212121",
            }}
          >
            <Tabs
              type="bar_false"
              group={tapGroupItem}
              selected={tabState}
              setSelected={setTabState}
            />
          </div>
        </div>
      ),
    },
    {
      label: "태그 컴포넌트",
      component: (
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tag type="orange" label="new" />
          <Tag type="red" label="fail" />
          <Tag type="blue" label="success" />
          <Tag type="green" label="confirm" />
          <Tag type="gray" label="waiting" />
        </div>
      ),
    },
    {
      label: "드롭다운(기본형)",
      component: (
        <DropdownInput
          label="최대탑승 인원"
          required={true}
          placeholder="인원"
          options={dropdownOptions}
          value={maxPassenger}
          onSelect={setMaxPassenger}
        />
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
