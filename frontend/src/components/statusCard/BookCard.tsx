import { ArrowRightIcon, DotIcon, PersonIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";
import type { BookDataType } from "@/components/types/bookType";
import { css } from "@emotion/react";
const { color, typography } = theme;

type CardType = "pending" | "success" | "fail";
interface BookCardProps {
  cardType: CardType;
  data: BookDataType;
}

const BookCard = ({ cardType, data }: BookCardProps) => {
  return (
    <div css={BookCardContainer}>
      <div>
        <div css={TimeWrapper}>
          <p css={TimeText}>{data.bookTime}</p>
          <p css={CardTypeText}>접수</p>
        </div>
        <div css={DateWrapper(cardType)}>
          <p>이용 희망 날짜</p>
          <p>{data.bookDate}</p>
        </div>
        <div css={LocationWrapper}>
          <p>{data.userStartLocation}</p>
          <ArrowRightIcon />
          <p>{data.userEndLocation}</p>
        </div>
      </div>
      <div css={UserWrapper}>
        <PersonIcon fill={color.GrayScale.gray4} />
        <p css={GrayText}>{data.name}</p>
        <DotIcon />
        <p css={GrayText}>{data.phone}</p>
      </div>
    </div>
  );
};

export default BookCard;

const BookCardContainer = css`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;

  &:hover {
    background-color: ${color.GrayScale.gray1};
  }
`;

const TimeWrapper = css`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding-bottom: 16px;
  align-items: end;
`;

const DateWrapper = (cardType: CardType) => css`
  width: fit-content;
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 4px;
  margin-bottom: 6px;
  border-radius: 10px;
  text-align: center;
  font: ${typography.Body.b2_medi};
  background-color: ${cardType === "pending"
    ? color.SemanticScale.orange[50]
    : cardType === "success"
      ? color.SemanticScale.blue[50]
      : color.SemanticScale.red[50]};
  color: ${cardType === "pending"
    ? color.Maincolor.primary
    : cardType === "success"
      ? color.Semantic.success
      : color.Semantic.error};
`;

const LocationWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font: ${typography.Body.b2_medi};
`;

const UserWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const TimeText = css`
  font: ${typography.Heading.h1_semi};
  gap: 8px;
`;

const CardTypeText = css`
  color: ${color.GrayScale.gray4};
  font: ${typography.Body.b3_medi};
  padding: 4px 0;
`;

const GrayText = css`
  color: ${color.GrayScale.gray4};
  font: ${typography.Body.b3_medi};
`;
