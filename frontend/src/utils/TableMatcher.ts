const MAPPING_TABLE = {
  //예약자 정보
  name: { label: "이름", type: "user" },
  phone: { label: "전화번호", type: "user" },
  isExistWalkingDevice: { label: "보행 기구 유무", type: "user" },
  bookTime: { label: "예약 접수 시간", type: "user" },

  //예약 정보
  bookDate: { label: "이용 희망 날짜", type: "booking" },
  userStartLocation: { label: "출발지", type: "booking" },
  userEndLocation: { label: "목적지", type: "booking" },
  hospitalTime: { label: "병원 도착 시간", type: "booking" },

  //경로 정보
  routeId: { label: "경로ID", type: "route" },
  carNumber: { label: "차량번호", type: "route" },
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
type TableType = "book" | "orders" | "centers" | "indexs";
type BookType = "user" | "booking" | "route";
type TableKey = keyof typeof MAPPING_TABLE;
export type TableObject = Partial<Record<TableKey, string | number | boolean>>;

const TableMatcher = {
  //전체 데이터를 각 테이블 타입에 맞게 분할
  matchTableType: (rows: TableObject[]) => {
    const getDataType = (data: TableObject): TableType => {
      if ("order" in data) return "orders";
      if ("centerName" in data) return "centers";
      if ("status" in data) return "indexs";
      return "book";
    };

    //데이터 타입이 book인 경우 예약자정보, 예약정보, 경로정보로 분할
    const splitBookData = (rows: TableObject[]) => {
      const groupData: Record<BookType, TableObject[]> = {
        user: [],
        booking: [],
        route: [],
      };
      rows.forEach((row) => {
        const user: TableObject = {};
        const booking: TableObject = {};
        const route: TableObject = {};

        Object.entries(row).forEach(([key, value]) => {
          const typedKey = key as TableKey;
          const type = MAPPING_TABLE[typedKey].type;
          if (type === "user") user[typedKey] = value;
          else if (type === "booking") booking[typedKey] = value;
          else if (type === "route") route[typedKey] = value;
        });

        groupData.user.push(user);
        groupData.booking.push(booking);
        groupData.route.push(route);
      });
      return groupData;
    };

    const dataType = getDataType(rows[0]);
    if (dataType !== "book") return { dataType, originRows: rows };
    const splitRows = splitBookData(rows);
    return {
      dataType,
      userRows: splitRows.user,
      bookingRows: splitRows.booking,
      routeRows: splitRows.route,
    };
  },

  //전체 행의 key값을 MAPPING_TABEL과 매칭
  matchTableHeader: (rows: TableObject[]) => {
    const keys = Object.keys(rows[0] ?? {}) as TableKey[];
    const labels = keys.map((key) => MAPPING_TABLE[key]["label"]);
    return { keys, labels };
  },
};

export default TableMatcher;
