import Table from "@/components/table/Table";

const AdminPage = () => {
  return (
    <div
      style={{
        padding: "40px 40px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <Table
        type="centers"
        rows={[
          ["성동구 노인회관", "010-0000-0000", "서울시 성동구", "3", "2"],
          ["성동구 노인회관", "010-0000-0000", "서울시 성동구", "3", "2"],
        ]}
      />
      <Table
        type="orders"
        rows={[["1", "홍길동", "010-0000-0000", "O", "12:00", "13:00"]]}
      />
      <Table
        type="books"
        rows={[["2025.07.22", "출발로 123", "도착로 123", "12:00"]]}
      />
      <Table type="users" rows={[["홍길동", "010-0000-0000", "O", "12:00"]]} />
    </div>
  );
};

export default AdminPage;
