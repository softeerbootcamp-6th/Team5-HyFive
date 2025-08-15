import { useNavigate } from "react-router";

const CenterPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/center/edit", {
      state: {
        carModel: "람보르기니",
        carNumber: "12가1234",
        maxPassenger: "8",
        isLowFloor: true,
      },
    });
  };

  return (
    <>
      <button onClick={handleNavigate}>navigate to edit</button>
    </>
  );
};

export default CenterPage;
