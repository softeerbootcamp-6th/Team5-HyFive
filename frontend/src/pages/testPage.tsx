/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";
import { useState } from "react";
import { CalenderIcon, TimeIcon } from "@/assets/icons";

import RadioGroup from "@/components/common/RadioGroup";
import Tabs from "@/components/common/Tabs";
import Tag from "@/components/common/Tag";
import Input from "@/components/common/Input";
import ToggleButton from "@/components/common/ToggleButton";
import DropdownInput from "@/components/common/DropdownInput";

const TestPage = () => {
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
