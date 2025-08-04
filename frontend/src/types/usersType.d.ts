export interface UserType {
  name: string;
  phone: string;
  isExistWalkingDevice: boolean;
  bookDate: string;
  userStartLocation: string;
  userEndLocation: string;
  hospitalTime: string;
  routeId: string;
  status: "pending" | "success" | "fail";
}
