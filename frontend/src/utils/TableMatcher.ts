const MAPPING_TABLE = {
  //예약자 정보
  name: { label: "이름", type: "user" },
  phone: { label: "전화번호", type: "user" },
  isExistWalkingDevice: { label: "보행 기구 유무", type: "user" },
  bookTime: { label: "예약 접수 시간", type: "user" },
  bookDate: { label: "예약 접수 날짜", type: "user" },

  //예약 정보
  hospitalTime: { label: "병원 도착 시간", type: "booking" },
  hospitalDate: { label: "이용 희망 날짜", type: "booking" },
  userStartLocation: { label: "탑승지", type: "booking" },
  userEndLocation: { label: "하차지", type: "booking" },

  //경로 정보
  routeId: { label: "경로ID", type: "route" },
  carNumber: { label: "차량 번호", type: "route" },
  routeStartTime: { label: "운행 시작 시간", type: "route" },
  routeEndTime: { label: "운행 종료 시간", type: "route" },
  routeStartLocation: { label: "시작점", type: "route" },
  routeEndLocation: { label: "종점", type: "route" },

  //탑승 순서 정보
  order: { label: "탑승 순서", type: "orders" },
  boardingTime: { label: "탑승 예정 시간", type: "orders" },
  getOffTime: { label: "하차 예정 시간", type: "orders" },

  //센터 정보
  centerName: { label: "센터명", type: "centers" },
  centerLocation: { label: "위치", type: "centers" },
  centerCarCount: { label: "등록 차량", type: "centers" },
  centerLowCarCount: { label: "저상형 대수", type: "centers" },

  //인덱스 테이블 정보
  status: { label: "상태", type: "index" },
  totalUserCount: { label: "탑승자", type: "index" },
} as const;

//타입
type BookType = "user" | "booking" | "route";
type TableKey = keyof typeof MAPPING_TABLE;
export type TableObject = Partial<Record<TableKey, string | number | boolean>>;

const TableMatcher = {
  //전체 행의 key값을 MAPPING_TABEL과 매칭
  matchTableHeader: (rows: TableObject[]) => {
    const allKeys = Object.keys(rows[0] ?? {});

    const keys = allKeys.filter(
      (key): key is TableKey => key in MAPPING_TABLE,
    ) as TableKey[];
    const labels = keys.map((key) => MAPPING_TABLE[key]["label"]);
    return { keys, labels };
  },

  //데이터 타입이 book인 경우 예약자정보, 예약정보, 경로정보로 분할
  matchBookTableType: (rows: TableObject[]) => {
    const groupData: Record<BookType, TableObject[]> = {
      user: [],
      booking: [],
      route: [],
    };

    rows.forEach((row) => {
      const grouped: Record<BookType, TableObject> = {
        user: {},
        booking: {},
        route: {},
      };

      Object.entries(row).forEach(([key, value]) => {
        const typedKey = key as TableKey;
        const type = MAPPING_TABLE[typedKey].type as BookType;
        grouped[type][typedKey] = value;
      });

      (Object.keys(grouped) as BookType[]).forEach((type) => {
        groupData[type].push(grouped[type]);
      });
    });

    return {
      userRows: groupData.user,
      bookingRows: groupData.booking,
      routeRows: groupData.route,
    };
  },
};

export default TableMatcher;
