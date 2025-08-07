import { ArrowRightIcon, DotIcon, PersonIcon } from "@/assets/icons";
import type { BookType } from "@/features/book/Book.types";
import {
  BookCardContainer,
  CardTypeText,
  DateWrapper,
  GrayText,
  LocationWrapper,
  TimeText,
  TimeWrapper,
  UserWrapper,
} from "@/features/book/BookCard.style";
import { theme } from "@/styles/themes.style";
import type { BookDataType } from "@/types/bookType";
const { color } = theme;

interface BookCardProps {
  bookType: BookType;
  data: BookDataType;
}

const BookCard = ({ bookType, data }: BookCardProps) => {
  return (
    <div css={BookCardContainer}>
      <div>
        <div css={TimeWrapper}>
          <p css={TimeText}>{data.bookTime}</p>
          <p css={CardTypeText}>접수</p>
        </div>
        <div css={DateWrapper(bookType)}>
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
