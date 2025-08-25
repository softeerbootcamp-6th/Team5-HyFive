import Tag from "@/components/Tag";
import type { HighlightType } from "@/features/map/Map.types";

const PassengerRouteItem = ({
  idx,
  passenger,
}: {
  idx: number;
  passenger: Partial<HighlightType>;
}) => {
  return (
    <>
      <p>{idx}</p>
      <p>{passenger.bookName}</p>
      <Tag type="orange" label={`예약 시간 : ${passenger.hospitalTime}`} />
    </>
  );
};

export default PassengerRouteItem;
