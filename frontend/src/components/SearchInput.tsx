import { SearchIcon } from "@/assets/icons";
import { theme } from "@/styles/themes.style";
import { css } from "@emotion/react";
const { color, typography } = theme;

interface SearchInputProps {
  searchType: "user" | "route";
}
const SEARCH_DEFAULT = {
  user: {
    maxLength: 13,
    placeholder: "예약자 전화번호 검색",
  },
  route: {
    maxLength: 5,
    placeholder: "경로 ID 검색",
  },
};
const SearchInput = ({ searchType }: SearchInputProps) => {
  return (
    <div css={SearchInputContainer}>
      <input
        css={InputWrapper}
        type="text"
        maxLength={SEARCH_DEFAULT[searchType].maxLength}
        placeholder={SEARCH_DEFAULT[searchType].placeholder}
      />
      <SearchIcon fill={color.GrayScale.gray4} />
    </div>
  );
};

export default SearchInput;

const SearchInputContainer = css`
  width: 320px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border-radius: 8px;
  border: 1px solid ${color.GrayScale.gray3};
`;

const InputWrapper = css`
  width: 240px;
  font: ${typography.Body.b4_medi};
  color: ${color.GrayScale.black};

  &::placeholder {
    color: ${color.GrayScale.gray4};
  }
`;
