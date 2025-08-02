import BookCard from "@/components/statusCard/BookCard";
import DrivingCard from "@/components/statusCard/DrivingCard";
import Table from "@/components/table/Table";
import { bookDataList } from "@/mocks/bookMocks";
import { drivingDataList } from "@/mocks/drivingMocks";
import { rowsCenter, rowsOrder, rowsUser } from "@/mocks/tableMocks";
import TableMatcher from "@/utils/TableMatcher";

const TestPage = () => {
  //Table
  const { dataType: orderType, originRows: orderRows } =
    TableMatcher.matchTableType(rowsOrder);
  const { dataType: centerType, originRows: centerRows } =
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
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <h1>🧪 컴포넌트 테스트 페이지</h1>

      {/* ✅ 테이블 컴포넌트 */}
      <section>
        <h2>📋 Table 컴포넌트</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            border: "1px dashed #aaa",
            padding: "1rem",
          }}
        >
          {orderType === "orders" && <Table rows={orderRows} />}
          {centerType === "centers" && <Table rows={centerRows} />}
          {userType === "book" && (
            <>
              <Table rows={userRows} />
              <Table rows={bookingRows} />
              <Table rows={routeRows} />
            </>
          )}
        </div>
      </section>

      {/* ✅ 예약 정보 카드 */}
      <section>
        <h2>🚐 예약 정보 카드</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            border: "1px dashed #aaa",
            padding: "1rem",
          }}
        >
          <BookCard cardType="pending" data={bookDataList[0]} />
          <BookCard cardType="success" data={bookDataList[1]} />
          <BookCard cardType="fail" data={bookDataList[2]} />
        </div>
      </section>

      {/* ✅ 운행 정보 카드 */}
      <section>
        <h2>🚐 운행 정보 카드</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            border: "1px dashed #aaa",
            padding: "1rem",
          }}
        >
          <DrivingCard drivingType="pending" data={drivingDataList[0]} />
          <DrivingCard drivingType="progress" data={drivingDataList[1]} />
          <DrivingCard drivingType="end" data={drivingDataList[2]} />
        </div>
      </section>

      {/* ✅ 애니메이션 포함 컴포넌트 */}
      <section>
        <h2>🎞️ 애니메이션 컴포넌트</h2>
        <div style={{ border: "1px dashed #aaa", padding: "1rem" }}>
          애니메이션 컴포넌트 자리
        </div>
      </section>

      {/* ✅ 칩 컴포넌트 */}
      <section>
        <h2>🏷️ 칩 컴포넌트</h2>
        <div style={{ border: "1px dashed #aaa", padding: "1rem" }}>
          칩 컴포넌트 자리
        </div>
      </section>

      {/* ✅ 버튼 컴포넌트 */}
      <section>
        <h2>🔘 버튼 컴포넌트</h2>
        <div style={{ border: "1px dashed #aaa", padding: "1rem" }}>
          버튼 컴포넌트 자리
        </div>
      </section>

      {/* ✅ 검색 컴포넌트 */}
      <section>
        <h2>🔍 검색 컴포넌트</h2>
        <div style={{ border: "1px dashed #aaa", padding: "1rem" }}>
          검색 컴포넌트 자리
        </div>
      </section>
    </div>
  );
};

export default TestPage;
