import { css } from "@emotion/react";
import { theme } from "@/styles/themes.style";

const { color, typography } = theme;

interface CenterInfoCardProps {
  icon: React.ReactNode;
  label: string;
  content: string;
}

const CenterInfoCard = ({ icon, label, content }: CenterInfoCardProps) => {
  return (
    <div css={CardContainer}>
      <div css={CardHeader}>
        {icon}
        <p css={CardLabel}>{label}</p>
      </div>
      <div css={CardContent}>{content}</div>
    </div>
  );
};

export default CenterInfoCard;

const CardContainer = css`
  display: flex;
  width: 460px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const CardHeader = css`
  display: flex;
  gap: 12px;
`;

const CardLabel = css`
  font: ${typography.Body.b3_medi};
  color: ${color.GrayScale.gray4};
`;

const CardContent = css`
  font: ${typography.Label.l2_semi};
  color: ${color.GrayScale.gray6};
`;
