import Table from "@/components/table/Table";
import TableMatcher from "@/utils/tableMatcher";

const AdminRegisterPage = () => {
  const rowsCenter = [
    {
      centerName: "성동구 노인회관",
      phone: "010-0000-0000",
      centerLocation: "서울시 성동구",
    },
    {
      centerName: "성동구 노인회관",
      phone: "010-0000-0000",
      centerLocation: "서울시 성동구",
    },
  ];
  const rowsUser = [
    {
      name: "김민정",
      phone: "010-0000-0000",
      isExistWalkingDevice: "o",
      bookTime: "12:20",
      bookDate: "2024.05.05",
      userStartLocation: "출발로123",
      routeId: "#1234",
    },
  ];

  const { dataType: centerType, originRows } =
    TableMatcher.matchTableType(rowsCenter);
  const {
    dataType: userType,
    userRows,
    bookingRows,
    routeRows,
  } = TableMatcher.matchTableType(rowsUser);
  return (
    <div
      style={{
        padding: "40px 40px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {centerType === "centers" && <Table rows={originRows} />}
      {userType === "book" && (
        <>
          <Table rows={userRows} />
          <Table rows={bookingRows} />
          <Table rows={routeRows} />
        </>
      )}
    </div>
  );
};

export default AdminRegisterPage;
