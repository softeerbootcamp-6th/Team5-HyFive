import type { UserType } from "@/components/types/usersType";

export const userDataList: UserType[] = [
  {
    name: "윤두준",
    phone: "010-2345-2345",
    isExistWalkingDevice: true,
    bookDate: "2025.07.22",
    userStartLocation: "출발로 123",
    userEndLocation: "도착로 123",
    hospitalTime: "11:30",
    routeId: "",
    status: "pending",
  },
  {
    name: "김민정",
    phone: "010-2345-2345",
    isExistWalkingDevice: true,
    bookDate: "2025.07.22",
    userStartLocation: "출발로 123",
    userEndLocation: "도착로 123",
    hospitalTime: "11:30",
    routeId: "8888",
    status: "success",
  },
  {
    name: "김민수",
    phone: "010-6294-4486",
    isExistWalkingDevice: true,
    bookDate: "2025.07.22",
    userStartLocation: "출발로 123",
    userEndLocation: "도착로 123",
    hospitalTime: "11:30",
    routeId: "9999",
    status: "fail",
  },
];
