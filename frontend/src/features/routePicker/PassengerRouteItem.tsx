import Tag from "@/components/Tag";
import type { PassengerRoute, RouteStatus } from "@/types/routeType.types";

const matchTag = (value: RouteStatus) => {
  if (value === "탑승") return "blue";
  if (value === "하차") return "red";
  return "gray";
};

const PassengerRouteItem = ({ passenger }: { passenger: PassengerRoute }) => {
  return (
    <>
      <p>{passenger.id}</p>
      <p>{passenger.name}</p>
      <Tag type={matchTag(passenger.status)} label={passenger.status} />
    </>
  );
};

export default PassengerRouteItem;
