//상수
const MAPPING_TABLE = {
  //common
  name: "이름",
  phone: "전화번호",
  isExistWalkingDevice: "보행 기구 유무",
  bookTime: "예약 접수 시간",
  bookDate: "이용 희망 날짜",
  userStartLocation: "출발지",
  userEndLocation: "목적지",
  hospitalTime: "병원 도착 시간",

  //routes
  routeId: "경로ID",
  carNumber: "차량번호",
  routeStartTime: "운행 시작 시간",
  routeEndTime: "운행 종료 시간",
  routeStartLocation: "시작점",
  routeEndLocation: "종점",

  //orders
  order: "탑승 순서",
  boardingTime: "탑승 예정 시간",
  getOffTime: "하차 예정 시간",

  //centers
  centerName: "센터명",
  centerLocation: "위치",
  centerCars: "등록 차량",
  centerLowCars: "저상형 대수",
} as const;

//타입
type TableType = "users" | "books" | "orders" | "centers";
type TableKey = keyof typeof MAPPING_TABLE;
export type TableObject = Partial<Record<TableKey, string | number>>;

const TableMatcher = {
  //전체 데이터를 각 테이블 타입에 맞게 분할
  matchTableType: (data: TableObject[]) => {},

  //전체 행의 key값을 MAPPING_TABEL과 매칭
  matchTableHeader: (rows: TableObject[]) => {
    const keys = Object.keys(rows[0] ?? {}) as TableKey[];
    const labels = keys.map((key) => MAPPING_TABLE[key]);
    return { keys, labels };
  },
};

export default TableMatcher;
