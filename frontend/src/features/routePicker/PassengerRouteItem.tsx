import Tag from "@/components/Tag";
import type { HighlightType } from "@/features/map/Map.types";

const PassengerRouteItem = ({
  passenger,
}: {
  passenger: Partial<HighlightType>;
}) => {
  return (
    <>
      <p>{passenger.bookId}</p>
      <p>{passenger.bookName}</p>
      <Tag type="orange" label={`예약 시간 : ${passenger.hospitalTime}`} />
    </>
  );
};

export default PassengerRouteItem;
